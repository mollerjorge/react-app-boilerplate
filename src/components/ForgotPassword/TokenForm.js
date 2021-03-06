import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import { useIntl, FormattedMessage } from 'react-intl';
import { object, string } from 'yup';
import PropTypes from 'prop-types';

import Form from 'components/Form';
import Loading from 'components/Loading';
import { handleErrors } from 'helpers/errors';
import AuthService from 'services/AuthService';
import { RESET_PASSWORD_STEPS } from './ForgotPassword';

import styles from './ForgotPassword.module.scss';

const TokenForm = ({ onStepChange, onSaveToken }) => {
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const validationSchema = object().shape({
    token: string(intl.messages['common.invalidToken'])
      .length(6, intl.messages['common.lengthToken'])
      .required(intl.messages['common.required']),
  });

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ token }) => {
    setLoading(true);

    try {
      await AuthService.verifyToken(token);
      onSaveToken(token);
      onStepChange(RESET_PASSWORD_STEPS.updatePassword);
    } catch ({ errors }) {
      const error = errors?.[0] || {
        errors: [intl.messages['common.invalidToken']],
      };
      handleErrors(error, formMethods.setError);
      setLoading(false);
    }
  };

  return (
    <Form
      data-testid="forgot-password-token-form"
      onSubmit={onSubmit}
      formMethods={formMethods}
    >
      <p className={styles.resetPasswordLegend}>
        <FormattedMessage id="common.forgotPasswordEmailSent" />
      </p>
      <Form.Input className={styles.formInput} name="token" type="number" />
      <button
        type="button"
        onClick={() => onStepChange(RESET_PASSWORD_STEPS.initial)}
        className={styles.link}
      >
        <FormattedMessage id="common.forgotPasswordEmailResend" />
      </button>
      <Form.Button text={intl.messages['common.next']} />
      {loading && <Loading />}
    </Form>
  );
};

TokenForm.propTypes = {
  onStepChange: PropTypes.func.isRequired,
  onSaveToken: PropTypes.func.isRequired,
};

export default TokenForm;
