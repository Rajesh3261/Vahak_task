import logo from './logo.svg';
import './App.css';
import { useFormik,ErrorMessage} from 'formik';
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import styled from 'styled-components'
import {Fragment, useState } from 'react';
import  Header from  './Components/Header';
import Nav from './Components/Nav';
import Otp from './Components/Otp'
export default function App() {
  
  const [data, setData] = useState({
    Source: "",
    Destination: "",
    car:"",
    travellers:"",
    bid:"",
        phone: "",
    name: "",
        
remarks:""
    
  });
  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = (formData) => {
    console.log("Form Submitted", formData);
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
    <StepThree next={handleNextStep} prev={handlePrevStep} data={data} />,
    <StepFour next={handleNextStep} prev={handlePrevStep} data={data} />,
    <Summary next={handleNextStep} prev={handlePrevStep} data={data}/>
  ];

  console.log("givendata", data);
 
  return <div className="App">

    {<Header/>}
  {<Nav stepno={currentStep}/>}
<MyForm>
    {steps[currentStep]}
    </MyForm>
    </div>;
}

const MyForm= styled.div`
display:flex;
justify-content:center;
`;

const Step1 = styled.div`
#route{
  display:flex;
  justify-content:space-between;
  p{
    display: flex;
    height:5px;
  }
  
}
#cartype{
  display:flex;
  flex-direction:column;
  margin:0px;
  label{
    display: flex;
    margin-left:0px;
    text-align: left;
    padding:2px;
  }
}
#Passangers{
 text-align:left;
 padding:2px;
 input{
   width:100%;
 }
}

button{
  width:100%;
  background-color: #0077ff;
  
  padding:10px;
  border-radius: 5px;
}
`;

const stepOneValidationSchema = Yup.object({
  Source: Yup.string().required().label("Source"),
  Destination: Yup.string().required().label("Destination"),
  car: Yup.string().required("Car selection required"),
  travellers: Yup.number()
});

const StepOne = (props) => {
  const handleSubmit = (values) => {
    console.log(values)
    props.next(values);
  };

  return (
    <Step1>
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
      
    >
      {() => (
        <Form>
         <div id="route">
           <table>
             <tr>
               <td>
          <p>Source</p>
          <Field name="Source" />
          <ErrorMessage name="Source" />
          </td>
          <td>
          <p>Destination</p>
          <Field name="Destination" />
          <ErrorMessage name="Destination" />
          </td>
          </tr>
          </table>
          </div>
          <div id='cartype'>
          <label htmlFor="car" style={{ display: 'block' }}>
        Select Car Type *
      </label>
     
      <Field  as="select"
        name="car">
          <option value='' label='Selet car'/>
        <option value="HatchBack" label="HatchBack" />
        <option value="Sedan" label="Sedan" />
        <option value="SUV" label="SUV" />
      </Field>
      <ErrorMessage name="car"/>
      </div>
      <div id="Passangers">
     <label htmlFor='travellers'>Enter no of Travelelrs</label>
     <br/>
     <Field name='travellers'/>
     <ErrorMessage name="travellers"/>
     </div>
     <br />
    
          <button type="submit">Enter Bid Details</button>
        </Form>
      )}
    </Formik>
    </Step1>
  );
};

const stepTwoValidationSchema = Yup.object({
   bid: Yup.number()
});

const Step2= styled.div`
text-align:left;
#jrn{
  color:grey;
}
button{
  margin-top:20px;
  background-color: #0077ff;

}
`;

const StepTwo = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };

  return (
    
    <Formik
      validationSchema={stepTwoValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Step2>
        <>
        
        <div id="Journey">
           
      <b id="jrn">JOURNEY DETAILS</b> <br />
        <b>{props.data.Source} to {props.data.Destination}</b>  
        <br /><b>{props.data.travellers} Persons</b> , <b>{props.data.car}</b>
      
          </div> <hr />
          <div>
            
        <Form>
        
          <label htmlFor='bid'>Amount Rs. </label>
          <Field type='number' id='bid' name='bid'/>
<br />
          <button type="button" onClick={() => props.prev(values)}>
            Back
          </button> <span />
          <button type="submit">Submit</button>
        </Form> </div>
        </>
        </Step2>
      )}
    </Formik>
   
  );
};

const Step3 = styled(Step2)`

button{
  margin-top:20px;
 
}
`;
const stepThreeValidationSchema = Yup.object({
  phone: Yup.number(),
  name: Yup.string().required('Name is required'),
  remarks: Yup.string()
})
const StepThree = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };

  return (
    <Step3>
    <>
    <Formik
      validationSchema={stepThreeValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <>
       <div id="Journey">
           
           <b id="jrn">JOURNEY DETAILS</b> <br />
             <b>{props.data.Source} to {props.data.Destination}</b>  
             <br /><b>{props.data.travellers} Persons</b> 
             <h1>Amount of Rs : {props.data.bid}</h1>
               </div> <hr />

        <Form>
      
      
     <label htmlFor='phone'>Enter your Mobile No: </label>
     <Field type='number' id='phone' name='phone'/>
      
     <label htmlFor='name'>Enter your name *</label>
          <Field type='text' id='name' name='name'/>
          <label htmlFor='remarks'>Enter Remarks(optional) </label>
          <Field type='text' id='remarks' name='remarks'/>
          <button type="button" onClick={() => props.prev(values)}>
            Back
          </button>
          <button type="submit">Submit</button>
        </Form>
        </>
      )}
    </Formik>
    </>
    </Step3>
    );

};
const StepFour = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };

  const Step4 = styled(Step3)`
 
  `;

  const stepFourValidationSchema = Yup.object({
   
 });
 
  return (
    <Step4>
    <div>
    <Formik
      validationSchema={stepFourValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
       
      {({ values }) => (
        <>
         <div id="Journey">
           
           <b id="jrn">JOURNEY DETAILS</b> <br />
             <b>{props.data.Source} to {props.data.Destination}</b>  
             <br /><b>{props.data.travellers} Persons</b> 
             <h1>Amount of Rs : {props.data.bid}</h1>
               </div> <hr />
        <Form>
           <button type="button" onClick={() => props.prev(values)}>
            Back
          </button>
          {<Otp />}
          <button type="submit">Verify Via OTP</button>
        </Form>
        </>
      )}
      
       
    </Formik>
    </div>
    </Step4>
    );

};

const Summary = (props) => {
  const handleSubmit = (values) => {
    props.next(values,true);
  };

  const summaryValidationSchema = Yup.object({
   
 });
 const Summary= styled(Step3)`
 `;
  return (
    <div>
    <Formik
      validationSchema={summaryValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
       
      {({ values }) => (
        <Summary>
           <div id="Journey">
           
           <b id="jrn">JOURNEY DETAILS</b> <br />
             <b>{props.data.Source} to {props.data.Destination}</b>  
             <br /><b>{props.data.travellers} Persons</b> 
             <h1>Amount of Rs : {props.data.bid}</h1>
               </div> <hr />
               <b>Bid Details</b>
<p>{props.data.phone} <br />
{props.data.name} <br />
{props.data.remarks} <br />
{props.data.bid}</p>
        <Form>
           <button type="button" onClick={() => props.prev(values)}>
            Back
          </button>
         
          <button type="submit">Submit Your Bid</button>
        </Form>
        
        </Summary>
      )}
      
       
    </Formik>
    </div>
     
    );

};
