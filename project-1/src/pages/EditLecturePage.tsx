import { Formik,ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';
import { FormControl, Input, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { successToast } from '../services/toastify.service';


const EditLecturePage = () => {
  const navigate=useNavigate();
    const [lecture,setLectures]=useState<any>({});
    const [removeVideo, setRemoveVideo]=useState(false);
    const {id}=useParams();
    const token=localStorage.getItem('jwt');
    
    //call api by individual id
    const getLectureById=async()=>{
        const response=await axios.get(`${import.meta.env.VITE_LOCAL_SERVER_URL}/lectures/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        setLectures(response.data);
    }

    useEffect(()=>{
        getLectureById();
    },[]);

    const handleEdit=async(values:any)=>{
      const formData: any = new FormData();
      formData.append("title",values.title);
      formData.append("content",values.content);
      formData.append("duration",values.duration);
      formData.append("file",values.duration);
      if(values.file){
        formData.append("video",values.file);
        formData.append("isVideoEdited",true);
       
      }else{
        formData.append("isVideoEdited",false);
      }
      const response=await axios.patch(`${import.meta.env.VITE_LOCAL_SERVER_URL}/lectures/${id}`,formData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(response.data.status){
        successToast(response.data.message);
        navigate("/lectures")
      }


    }
    
  return (
    <>
    <div className='container mb-5 mx-auto w-100'>
      <h2 className='text-center font-bold'>Edit Lecture</h2>
      {
      lecture.status?<Formik 
      initialValues={{
        title:lecture.data.title,
        content:lecture.data.content,
        duration:lecture.data.duration,
        file:null,
        isVideoEdited:false,

      }}
    //   validationSchema={}
      onSubmit={handleEdit}
      >
        {({values,
          handleChange, handleSubmit,
         setFieldValue,
       
       }) => (
       <Form onSubmit={handleSubmit}>
        <div>
        <FormControl>
          <InputLabel htmlFor="title">Lecture Title</InputLabel>
          <Input type='text' id='title' name='title' className='w-full border border-rounded' 
          value={values.title}
          onChange={handleChange}/>
          <ErrorMessage name="title" className="text-danger" />
        </FormControl>
        </div>
       <div> <FormControl>
          <InputLabel htmlFor="content">Lecture Content</InputLabel>
          <Input type='text' id='content' name='content' className='w-full border border-rounded'value={values.content} onChange={handleChange}/>
          <ErrorMessage name="content" className="text-danger" />
        </FormControl></div>
        <div>
        <FormControl>
          <InputLabel htmlFor="duration">Duration</InputLabel>
          <Input type='text' id='duration' name='duration' className='w-full border border-rounded' value={values.duration} onChange={handleChange}/>
          <div className="text-danger">
         <ErrorMessage name="duration"  />
         </div>
        </FormControl>
        </div>
        <div>
        {removeVideo?<FormControl>
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
        </FormControl>:
        (<div className='mb-2 mt-4 me-4'>
          <label htmlFor="file" className='mb-2'>current video</label>
          <video id='file' width={310} height={150}>
            <source src={lecture.data.lectureUrl}/>
          </video>
          <button className='btn btn-danger' onClick={(e)=>{
            e.preventDefault();
            setRemoveVideo(true)}}>Del</button>
          </div>)}
        </div>
        <button type='submit' className='btn btn-info' >Edit Lecture</button>
       </Form>
         
       )}


      </Formik>:"loading"
      }
    </div>
   </>
  )
}

export default EditLecturePage