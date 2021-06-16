// @ts-ignore
import React from 'react'
import { TextField, FormControl, Button } from '@material-ui/core'
// import { styles } from './Form.style';
import { observable } from 'mobx'
import { observer } from 'mobx-react';
import validatorjs from 'validatorjs';
import dvr from 'mobx-react-form/lib/validators/DVR'
import MobxReactForm from 'mobx-react-form'
const formFields = {
  email: {
    type: 'text',
    label: 'email',
    placeholder: 'Your Email Address',
    rules: 'required|email|string|between:5,50',
    value: '',
  }
}

// const classes = styles();
@observer
class Form extends React.Component {
  getValidation(fields): MobxReactForm {
    const hooks: any = {

      onSuccess(form) {
        alert('Form is valid! Send the request here.');
        // get field values
        console.log('Form Values!', form.values());
      },

      onError(form) {
        // get all form errors
        console.log('All form errors', form.errors());
        // invalidate the form with a custom error message
        form.invalidate('This is a generic error message!');
      },

    };
    const plugins: any = {
      dvr: dvr(validatorjs)
    };

    const formOptions: any = {
      validateOnChange: true,
    };

    return new MobxReactForm({ fields }, { plugins, hooks, formOptions })
  }
  @observable
  private form: MobxReactForm = this.getValidation(formFields);
  render() {
    console.log(this.form)
    return (
      <div >
        <form onSubmit={this.form.onSubmit}>
          <div >

            <TextField
              label="name"
              {...this.form.$('email').bind()}
            />

            <p style={{ color: "red" }}>{this.form.$('email').error}</p>
            <Button variant="contained" color="primary" type="submit" disabled={!this.form.isValid}>
              Primary
            </Button>
          </div>
        </form>
      </div>
    )
  }
}
export default Form;
