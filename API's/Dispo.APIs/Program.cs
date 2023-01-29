using Dispo.Infrastructure.Context;
using Dispo.IoC;
using EscNet.IoC.Cryptography;
using EscNet.IoC.Hashers;
using Isopoh.Cryptography.Argon2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

#region Injections

Injector.InjectIoCServices(builder.Services);
builder.Services.AddSingleton(x => builder.Configuration);

#endregion Injections

#region Database

builder.Services.AddDbContext<DispoContext>(option =>
    option.UseSqlServer(builder.Configuration.GetConnectionString("DispoDefaultConnection")), ServiceLifetime.Transient);

#endregion Database

#region Jwt

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = true;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

#endregion Jwt

#region Swagger

builder.Services.AddSwaggerGen(x =>
{
    x.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Dispo backend API's",
        Version = "v1",
        Description = "Parte das API's backend que vão conversar com o front em react",
        Contact = new OpenApiContact()
        {
            Name = "Dispo",
            Email = "dispo.contatogmail.com"
        },
    });

    x.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        In = ParameterLocation.Header,
        Description = "Utilize um token Bearer",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    x.AddSecurityRequirement(new OpenApiSecurityRequirement {
    {
        new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        },
        new string[]{ }
    }
    });
});

#endregion Swagger

#region Argon2

var argonConfig = new Argon2Config()
{
    Type = Argon2Type.DataIndependentAddressing,
    Version = Argon2Version.Nineteen,
    Threads = Environment.ProcessorCount,
    TimeCost = int.Parse(builder.Configuration["Hash:TimeCost"]),
    MemoryCost = int.Parse(builder.Configuration["Hash:MemoryCost"]),
    Lanes = int.Parse(builder.Configuration["Hash:Lanes"]),
    HashLength = int.Parse(builder.Configuration["Hash:HashLength"]),
    Salt = Encoding.UTF8.GetBytes(builder.Configuration["Hash:Salt"])
};

builder.Services.AddArgon2IdHasher(argonConfig);

#endregion Argon2

#region RijndaelCryptography

builder.Services.AddRijndaelCryptography(builder.Configuration["CriptographyKey:Key"]);

#endregion RijndaelCryptography

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddMemoryCache();
builder.Host.UseSerilog((hostingContext, loggerConfiguration) =>
{
    loggerConfiguration.ReadFrom.Configuration(hostingContext.Configuration);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(x => x.AllowAnyHeader()
      .AllowAnyMethod()
      .WithOrigins("http://localhost:3000"));

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();