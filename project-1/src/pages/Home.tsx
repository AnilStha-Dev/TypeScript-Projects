import { useEffect, useState } from 'react'
import { deleteData, getData } from '../services/axios.service'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { successToast } from '../services/toastify.service';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const navigate=useNavigate();
  const [lectures, setLectures]=useState([]);
  const getLectures=async()=>{
    const response=await getData("lectures"); 
    if(response.status){
      setLectures(response.data);
    }
    
  }
  useEffect(()=>{
    getLectures();
  },[]);

  const deleteHandler=async(e:Event,id:string)=>{
    e.preventDefault();
    const response =await deleteData(`lectures/${id}`);
    if(response.status){
      const filteredData=lectures.filter((lecture:LectureInterface)=>{
        return lecture._id!==id;
      })
      setLectures(filteredData);
      successToast(response.message);
    }

  };
  const addHandler=(e:any)=>{
    e.preventDefault();
    navigate("/lectures/add");
  }
  const editHandler=(e:any,id:any)=>{
    e.preventDefault();
    navigate(`/lectures/${id}`);
  }
  return (
    <>
    <button className='btn btn-primary' onClick={(e)=>addHandler(e)}>Add Lecture</button>
    <div className='d-flex flex-wrap gap-4'>
    {lectures.map((lecture:LectureInterface)=>{
      return(
        <Card key={lecture._id} style={{ width: '25rem' }} className='bg-primary'>
        <video width="325" height="260" controls>
  <source src={lecture.lectureUrl} type="video/mp4"/>
</video>
        <Card.Body>
          <Card.Title>{lecture.title}</Card.Title>
          <Card.Text>
           {lecture.content}
          </Card.Text>
          <Card.Text>Duration : 
            { lecture.duration} hours
          </Card.Text>
          <Button variant="info" className='me-4' onClick={(e:any)=>{editHandler(e,lecture._id)}}>Edit</Button>
          <Button variant="danger" onClick={(e:any)=>deleteHandler(e,lecture._id)}>Delete</Button>
        </Card.Body>
      </Card>
      );
    }
    )}
    </div>
    </>
  )
}

export default Home;