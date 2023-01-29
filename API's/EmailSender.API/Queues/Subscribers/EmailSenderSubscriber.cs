using EmailSender.API.DTOs.RequestDTO;
using EmailSender.API.Queues.Subscribers.Interfaces;
using EmailSender.API.Services.Interfaces;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Serilog;
using System.Text;

namespace EmailSender.API.Queues.Subscribers
{
    public class EmailSenderSubscriber : BackgroundService, IEmailSenderSubscriber
    {
        public IConnection? Connection { get; set; }
        public IModel? Channel { get; set; }
        private const string QUEUE_NAME = "email_sender";
        private readonly IEmailSenderService _emailSenderService;
        private readonly Serilog.ILogger _logger;

        public EmailSenderSubscriber(IEmailSenderService emailSenderService)
        {
            _emailSenderService = emailSenderService;
            _logger = new LoggerConfiguration().WriteTo.Console().CreateLogger();
        }

        public void StartConsuming()
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            Connection = factory.CreateConnection();
            Channel = Connection.CreateModel();

            Channel.QueueDeclare(queue: QUEUE_NAME,
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

            var consumer = new EventingBasicConsumer(Channel);
            consumer.Received += Consumer_Received;

            Channel.BasicConsume(queue: QUEUE_NAME,
                                 autoAck: true,
                                 consumer: consumer);
        }

        private void Consumer_Received(object? sender, BasicDeliverEventArgs e)
        {
            var body = e.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);

            ProcessEvent(message);
        }

        private void ProcessEvent(string message)
        {
            var request = JsonConvert.DeserializeObject<EmailSenderRequestDto>(message);

            if (request != null)
            {
                _emailSenderService.SendEmailAsync(request);

                _logger.Information($"Processando mensagem: {message}");
            }
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                StartConsuming();
                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                return Task.FromException(ex);
            }
        }
    }
}