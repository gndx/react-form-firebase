import React, { Component } from 'react';
import firebaseConf from './Firebase';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: [],
      alert: false,
      alertData: {}
    };
  }

  showAlert(type, message) {
    this.setState({
      alert: true,
      alertData: { type, message }
    });
    setTimeout(() => {
      this.setState({ alert: false });
    }, 4000)
  }

  resetForm() {
    this.refs.contactForm.reset();
  }

  componentWillMount() {
    let formRef = firebaseConf.database().ref('form').orderByKey().limitToLast(6);
    formRef.on('child_added', snapshot => {
      const { name, email, city, phone, message } = snapshot.val();
      const data = { name, email, city, phone, message };
      this.setState({ form: [data].concat(this.state.form) });
    })
  }

  sendMessage(e) {
    e.preventDefault();
    const params = {
      name: this.inputName.value,
      email: this.inputEmail.value,
      city: this.inputCity.value,
      phone: this.inputPhone.value,
      message: this.textAreaMessage.value
    };
    if (params.name && params.email && params.phone && params.phone && params.message) {
      firebaseConf.database().ref('form').push(params).then(() => {
        this.showAlert('success', 'Your message was sent successfull');
      }).catch(() => {
        this.showAlert('danger', 'Your message could not be sent');
      });
      this.resetForm();
    } else {
      this.showAlert('warning', 'Please fill the form');
    };
  }

  render() {
    return (
      <div>
        {this.state.alert && <div className={`alert alert-${this.state.alertData.type}`} role='alert'>
          <div className='container'>
            {this.state.alertData.message}
          </div>
        </div>}
        <div className='container' style={{ padding: `40px 0px` }}>
          <div className='row'>
            <div className='col-sm-4'>
              <h2>Contact Form</h2>
              <form onSubmit={this.sendMessage.bind(this)} ref='contactForm' >
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <input type='text' className='form-control' id='name' placeholder='Name' ref={name => this.inputName = name} />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Email</label>
                  <input type='email' className='form-control' id='email' placeholder='Email' ref={email => this.inputEmail = email} />
                </div>
                <div className='form-group'>
                  <label htmlFor='city'>City</label>
                  <select className='form-control' id='city' ref={city => this.inputCity = city}>
                    <option value='México'>México</option>
                    <option value='Guadalajara'>Guadalajara</option>
                    <option value='Monterrey'>Monterrey</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='phone'>Phone</label>
                  <input type='number' className='form-control' id='phone' placeholder='+52 1' ref={phone => this.inputPhone = phone} />
                </div>
                <div className='form-group'>
                  <label htmlFor='message'>Message</label>
                  <textarea className='form-control' id='message' rows='3' ref={message => this.textAreaMessage = message}></textarea>
                </div>
                <button type='submit' className='btn btn-primary'>Send</button>
              </form>
            </div>
            <div className='col-sm-8'>
              <div className='row'>
                {this.state.form.map(form =>
                  <div className='col-sm-6' key={form.phone} style={{ margin: `0px 0px 30px 0px` }}>
                    <div className='card'>
                      <div className='card-body'>
                        <h4 className='card-title'>{form.name}</h4>
                        <h6 className='card-subtitle mb-2 text-muted'>{form.city}</h6>
                        <p className='card-text'>{form.message}</p>
                        <a href={`tel:${form.phone}`} className='card-link'>{form.phone}</a>
                        <a href={`mailto:${form.email}`} className='card-link'>{form.email}</a>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
        <div className='alert alert-info fixed-bottom'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-12'>
                GnDx: <a href='https://gndx.co/formulario-contacto-react-firebase/' className='alert-link'>Formulario de Contacto con React + Firebase </a>
                GitHub: <a href='https://github.com/gndx/react-form-firebase' className='alert-link'>react-form-firebase</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;