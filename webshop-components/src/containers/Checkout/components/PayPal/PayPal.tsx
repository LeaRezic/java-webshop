import * as React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

const CURRENCY = process.env.REACT_APP_PAYPAL_CURRENCY;
const SANDBOX_KEY = process.env.REACT_APP_PAYPAL_SANDBOX_APP_ID;
const ENVIRONMENT = process.env.REACT_APP_PAYPAL_ENVIRONMENT;
const PROD_KEY = process.env.REACT_APP_PAYPAL_PRODUCTION_APP_ID;

interface IPayPalProps {
  totalAmount: number;
  onSuccess: (payment: any) => void;
  onCancel: (data: any) => void;
  onError: (err: any) => void;
}

export class PayPal extends React.PureComponent<IPayPalProps> {
  render() {
    const client = {
      sandbox: SANDBOX_KEY,
      production: PROD_KEY,
    }
    return (
      <PaypalExpressBtn
        env={ENVIRONMENT}
        client={client}
        currency={CURRENCY}
        total={this.props.totalAmount}
        onError={this.props.onError}
        onSuccess={this.props.onSuccess}
        onCancel={this.props.onCancel}
      />
    );
  }
}
