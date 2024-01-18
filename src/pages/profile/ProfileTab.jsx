import { useEffect } from "react";
import { MDBCol } from "mdb-react-ui-kit";
import { useFormik } from "formik";

import RegisterPanel from "layouts/panel/register/classic/RegisterPanel";
import useAlertScheme from "hooks/alert/useAlertScheme";
import useFetch from "hooks/useFetchApi";
import { TextField } from "components/ui/inputs/textfield/TextField";
import { PhoneField } from "components/ui/inputs/masked/PhoneField";
import { ENDPOINTS } from "utils/constants/endpoints";
import { getAccountId } from "services/authToken";
import { put } from "services/httpMethods";

function ProfileTab() {
  const { data: userAccountInfo } = useFetch(
    ENDPOINTS.userAccount.getAllUserInfo,
    getAccountId()
  );

  const [showAlert, openAlert] = useAlertScheme();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validateOnChange: false,
    onSubmit: async (values) => {
      var accountId = getAccountId();

      var request = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phoneNumber,
      };

      var response = await put(
        ENDPOINTS.userAccount.updateUserAccountInfo,
        accountId,
        request
      );

      openAlert(response.alertType, response.message);
    },
  });

  useEffect(() => {
    if (!userAccountInfo || !userAccountInfo.data) return;

    var userAccountInfoData = userAccountInfo && userAccountInfo.data;

    formik.setFieldValue("email", userAccountInfoData.email);
    formik.setFieldValue("firstName", userAccountInfoData.firstName);
    formik.setFieldValue("lastName", userAccountInfoData.lastName);
    formik.setFieldValue("phoneNumber", userAccountInfoData.phone);
  }, [userAccountInfo]);

  return (
    <RegisterPanel alertPanel={showAlert} onSubmit={formik.handleSubmit}>
      <MDBCol>
        <TextField
          type="email"
          label="Email"
          value={formik.values.email}
          error={formik.errors.email}
          onChange={(e) => formik.setFieldValue("email", e.target.value)}
        />
      </MDBCol>
      <MDBCol>
        <TextField
          label="Nome"
          value={formik.values.firstName}
          error={formik.errors.firstName}
          onChange={(e) => formik.setFieldValue("firstName", e.target.value)}
        />
      </MDBCol>
      <MDBCol>
        <TextField
          label="Sobrenome"
          value={formik.values.lastName}
          error={formik.errors.lastName}
          onChange={(e) => formik.setFieldValue("lastName", e.target.value)}
        />
      </MDBCol>
      <MDBCol>
        <PhoneField
          label="Telefone"
          value={formik.values.phoneNumber}
          error={formik.errors.phoneNumber}
          onChange={(e) => formik.setFieldValue("phoneNumber", e.target.value)}
        />
      </MDBCol>
    </RegisterPanel>
  );
}

export default ProfileTab;
