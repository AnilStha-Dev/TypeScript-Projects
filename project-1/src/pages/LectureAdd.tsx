
 import { object, string, number,mixed } from 'yup';
 import { Formik,ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';
import { FormControl, Input, InputLabel } from '@mui/material';
import { postDatawithHeaders } from '../services/axios.service';
import { successToast } from '../services/toastify.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LectureAdd = () => {
  const [buttonIsDesabled,setbuttonIsDesabled]=useState(false);
  const navigate=useNavigate();
  const initialValues={
    title:"",
    content:"",
    duration:"",
    file:null,
  };
let lectureValidationSchema = object({
  title: string().required("title is required"),
  content: string().required("content is req"),
  duration: number().required("duration is required"),
  file:mixed().required("file is req"),
  
});
const handleSubmit=async(values:any)=>{
  setbuttonIsDesabled(true);
  const formData= new FormData();
  formData.append("title", values.title);
  formData.append("content", values.content); 
  formData.append("duration", values.duration);
  formData.append("video", values.file);
  const response=await postDatawithHeaders("lectures",formData);
  if(response.status){
    successToast(response.message);
    navigate("/lectures");
  }

  

}

  return (

   <>
    <div className='container mb-5 mx-auto w-100'>
      <h2 className='text-center font-bold'>Add Lecture</h2>
      <Formik 
      initialValues={initialValues}
      validationSchema={lectureValidationSchema}
      onSubmit={handleSubmit}
      >
        {({
          handleChange, handleSubmit,
         setFieldValue,
       
       }) => (
       <Form onSubmit={handleSubmit}>
        <div>
        <FormControl>
          <InputLabel htmlFor="title">Lecture Title</InputLabel>
          <Input type='text' id='title' name='title' className='w-full border border-rounded' onChange={handleChange}/>
          <ErrorMessage name="title" className="text-danger" />
        </FormControl>
        </div>
       <div> <FormControl>
          <InputLabel htmlFor="content">Lecture Content</InputLabel>
          <Input type='text' id='content' name='content' className='w-full border border-rounded' onChange={handleChange}/>
          <ErrorMessage name="content" className="text-danger" />
        </FormControl></div>
        <div>
        <FormControl>
          <InputLabel htmlFor="duration">Duration</InputLabel>
          <Input type='text' id='duration' name='duration' className='w-full border border-rounded' onChange={handleChange}/>
          <div className="text-danger">
         <ErrorMessage name="duration"  />
         </div>
        </FormControl>
        </div>
        <div>
        <FormControl>
          <Input type='file'
           id='file' 
           name='file' 
           className='w-full border border-rounded'
           onChange={(e:any)=>{
            setFieldValue("file", e.currentTarget.files[0]);
           }}
            />
         <div className="text-danger">
         <ErrorMessage name="file"  />
         </div>
        </FormControl>
        </div>
        <button type='submit' className='btn btn-info' disabled={buttonIsDesabled}>Add</button>
       </Form>
         
       )}


      </Formik>
    </div>
   </>
  )
}

export default LectureAdd