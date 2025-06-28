import { useState } from "react";
import {NavLink} from "react-router-dom"
import React from 'react'
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
interface FormData {
  name: string;
  phone: string;
  altPhone: string;
  email: string;
  altEmail: string;
  status: string;
  qualification: string;
  interestField: string;
  source: string;
  assignedTo: string;
  jobInterest: string;
  state: string;
  city: string;
  passoutYear: string;
  heardFrom: string;
}


function AddLead() {
   const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiResponse, setapiResponse] = useState("");
 const [formData, setFormData] = useState({
  name: '',
  phone: '',
  altPhone: '',
  email: '',
  altEmail: '',
  status: '',
  qualification: '',
  interestField: '',
  source: '',
  assignedTo: '',
  jobInterest: '',
  state: '',
  city: '',
  passoutYear: '',
  heardFrom:''
});
const validateField = (name, value) => {
  const phonePattern = /^\d{10}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  let error = "";

  switch (name) {
    case "name":
      if (!value.trim()) error = "Name is required";
      break;
    case "email":
      if (!value.trim()) error = "Email is required";
      else if (!emailPattern.test(value)) error = "Invalid email";
      break;
    case "phone":
      if (!value.trim()) error = "Mobile is required";
      else if (!phonePattern.test(value)) error = "Enter a valid 10-digit mobile number";
      break;
    case "state":
      if (!value.trim()) error = "State is required";
      break;
    case "city":
      if (!value.trim()) error = "City is required";
      break;
    case "assignedTo":
      if (!value.trim()) error = "Assigned To is required";
      break;
    case "status":
      if (!value.trim()) error = "Status is required";
      break;
    case "qualification":
      if (!value.trim()) error = "Qualification is required";
      break;
    case "interestField":
      if (!value.trim()) error = "Interest Field is required";
      break;
    case "jobInterest":
      if (!value.trim()) error = "Job Interest is required";
      break;
    case "passoutYear":
      if (!value.trim()) error = "Passout Year is required";
      break;
    case "source":
      if (!value.trim()) error = "Source is required";
      break;
    default:
      break;
  }

  // Set or clear the error
  setErrors((prev) => {
    const updatedErrors = { ...prev };
    if (error) updatedErrors[name] = error;
    else delete updatedErrors[name];
    return updatedErrors;
  });
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
   validateField(name, value);
};


   const validation = () => {
    let stepErrors: Record<string, string> = {};
    const phonePattern = /^\d{10,15}$/; 
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!formData.name) {
      stepErrors.name = "Name is required";
    }
    if (!(formData.email && regex.test(formData.email))) {
      if (!formData.email) {
        stepErrors.email = "Email is required";
      } else {
        stepErrors.email= "Invalid email";
      }
    }
     if (!formData.phone.trim()) stepErrors.phone = "Mobile is required";
      else if (!/^\d{10}$/.test(formData.phone)){
        stepErrors.phone = "Enter a valid 10-digit mobile number";}
        
        
//     if (!/^\d{10}$/.test(formData.altPhone)){
//         stepErrors.altPhone = "Enter a valid 10-digit mobile number";}
// if (regex.test(formData.altEmail)) {
//       stepErrors.altEmail = "Invalid email";
//     }
    if (!formData.state) {
      stepErrors.state = " State is required";
    }
    if (!formData.city) {
      stepErrors.city = " City is required";
    }
    if(!formData.assignedTo){
      stepErrors.assignedTo= "Assigned To is required"
    }
   if(!formData.status){
     stepErrors.status= "Status is required"
   }
      if(!formData.qualification){
     stepErrors.qualification= "Qualification is required"
   }
    if(!formData.interestField){
     stepErrors.interestField= "Interest Field is required"
   }
   if(!formData.jobInterest){
     stepErrors.jobInterest= "Job Interest is required"
   }
    if(!formData.passoutYear){
     stepErrors.passoutYear= "Passout year is required"
   }
    if(!formData.source){
     stepErrors.source= "Source is required"
   }

    return stepErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalErrors = {
      ...validation()
      
    };
    if (Object.keys(finalErrors).length === 0) {
      console.log("Form submitted", formData);

      // Handle form submission logic here (e.g., sending to an API)
     const formDataToSend = {
      name: formData.name,
      email: formData.email,
      altEmail: formData.altEmail,
      phone: formData.phone,
      altPhone: formData.altPhone,
      assignedTo: formData.assignedTo,
      heardFrom: formData.heardFrom,
      city: formData.city,
      interestField: formData.interestField,
      jobInterest: formData.jobInterest,
      passoutYear: formData.passoutYear,
      qualification: formData.qualification,
      source: formData.source,
      state: formData.state,
      status: formData.status,
    };
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/lead/add`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
        });
        const result = await response.json();
        if (response.ok) {
         setapiResponse(result.message)
          window.location.reload();
        }else{
           setapiResponse(result.message)
        }
      } catch (e) {
        setapiResponse(`Error: ${e.message}. Server error`)
          
         
        return e;
      }
    } else {
      //setLoading(false);
      setErrors(finalErrors);
    }
  };

  return (
    
    <div className="w-full flex justify-center bg-transparent">
      <div className=' bg-white rounded-md flex flex-col p-5  '>
     <div className='w-full flex justify-between mb-5'>
       <div className=' text-2xl font-bold'>Add Lead</div>
      
     </div>
    <div> 
      <form onSubmit={handleSubmit} className=' flex flex-col gap-y-4 ' action="">
        <div className=' flex flex-wrap justify-between gap-y-4  '>
  <div >
    <label htmlFor="" className=' font-medium '>Name </label>
    <br />
    <input 
     name="name"
      value={formData.name}
      onChange={handleChange}
    className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300" type="text" />
     <div className="w-56 text-red-700 text-[12px] ">
     {errors.name && (
           <span>{errors.name}*</span>
         )}
     </div>
    </div>
   
  <div>
    <label htmlFor=""  className=' font-medium '>Phone</label>
    <br />
    <input 
     name="phone"
      value={formData.phone}
      onChange={handleChange}
    className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300" type="text" />
    <div className="w-56 text-red-700 text-[12px] ">
   {errors.phone && (
           <span>{errors.phone}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor="" className=' font-medium '>Alt. Phone</label>
    <br />
    <input  
      name="altPhone"
      value={formData.altPhone}
      onChange={handleChange}
    className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300" type="text" />
     <div className="w-56 text-red-700 text-[12px] ">
   {errors.altPhone && (
           <span>{errors.altPhone}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor="" className=' font-medium '>Email</label>
    <br />
    <input 
      name="email"
      value={formData.email}
      onChange={handleChange}
    className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300" type="text" />
     <div className="w-56 text-red-700 text-[12px] ">
   {errors.email && (
           <span>{errors.email}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor="" className=' font-medium '>Alt. Email</label>
    <br />
    <input 
     name="altEmail"
      value={formData.altEmail}
      onChange={handleChange}
    className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300" type="text" />
    <div className="w-56 text-red-700 text-[12px] ">
   {errors.altEmail && (
           <span>{errors.altEmail}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor="" className=' font-medium '>Status</label>
    <br />
      <select
       name="status"
      value={formData.status}
      onChange={handleChange}
      className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300"
      >
       <option value="">select...</option>
       <option value="New">New</option>
       <option value="Follow-Up">Follow-Up</option>
       <option value="Qualified">Qualified</option>
       <option value="Converted">Converted</option>                             
      </select>
      <div className="w-56 text-red-700 text-[12px] ">
   {errors.status && (
           <span>{errors.status}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor="" className=' font-medium '>Qualification</label>
    <br />
    <select
      name="qualification"
      value={formData.qualification}
      onChange={handleChange}
      className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300"
      >
       <option value="">select...</option>
       <option value="PhD">PhD</option>
       <option value="Masters">Masters</option>
       <option value="Bachelors">Bachelors</option>
       <option value="High School">High School</option>
       <option value="Other">Other</option>
                                
      </select>
       <div className="w-56 text-red-700 text-[12px] ">
   {errors.qualification && (
           <span>{errors.qualification}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor="" className=' font-medium '>Interest Field</label>
    <br />
   <select
      name="interestField"
      value={formData.interestField}
      onChange={handleChange}
      className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300"
      >
       <option value="">select...</option>
       <option value="Mobile Development">Mobile Development</option>
       <option value="Digital Marketing">Digital Marketing</option>
       <option value="Data Science">Data Science</option>
       <option value="Web Development">Web Development</option>
       <option value="UI/UX Design">UI/UX Design</option>
                                
      </select>
       <div className="w-56 text-red-700 text-[12px] ">
   {errors.interestField && (
           <span>{errors.interestField}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor="" className=' font-medium '>Source</label>
    <br />
    <select
       name="source"
      value={formData.source}
      onChange={handleChange}
      className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300"
      >
       <option value="">select...</option>
       <option value="Email Campaign">Email Campaign</option>
       <option value="Website">Website</option>
       <option value="Cold Call">Cold Call</option>
       <option value="Social Media">Social Media</option>
                                
      </select>
        <div className="w-56 text-red-700 text-[12px] ">
   {errors.source && (
           <span>{errors.source}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor="" className=' font-medium '>Assigned To</label>
    <br />
    <select
       name="assignedTo"
      value={formData.assignedTo}
      onChange={handleChange}
      className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300"
      >
       <option value="">select...</option>
       <option value="John Doe">John Doe</option>
       <option value="Jane Smith">Jane Smith</option>
       <option value="Emily Davis">Emily Davis</option>
       <option value="Robert Johnson">Robert Johnson</option>
                                  
      </select>
       <div className="w-56 text-red-700 text-[12px] ">
   {errors.assignedTo && (
           <span>{errors.assignedTo}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor=""  className=' font-medium '>Job Interest</label>
    <br />
    <select
      name="jobInterest"
      value={formData.jobInterest}
      onChange={handleChange}
      className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300"
      >
         <option value="">select...</option>
        <option value="Mobile Development">Mobile Development</option>
       <option value="Digital Marketing">Digital Marketing</option>
       <option value="Data Science">Data Science</option>
       <option value="Web Development">Web Development</option>
       <option value="UI/UX Design">UI/UX Design</option>                         
      </select>
       <div className="w-56 text-red-700 text-[12px] ">
   {errors.jobInterest && (
           <span>{errors.jobInterest}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor=""  className=' font-medium '>State</label>
    <br />
    <input  
     name="state"
      value={formData.state}
      onChange={handleChange}  
      className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300" type="text" />
        <div className="w-56 text-red-700 text-[12px] ">
   {errors.state && (
           <span>{errors.state}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor="" className=' font-medium '>City</label>
    <br />
    <input
     name="city"
      value={formData.city}
      onChange={handleChange}
      className=" p-3 mt-2  w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300" type="text" />
        <div className="w-56 text-red-700 text-[12px] ">
   {errors.city && (
           <span>{errors.city}*</span>
         )}
    
     </div>
    </div>
  <div>
    <label htmlFor="" className=' font-medium '>Passout Year</label>
    <br />
    <input
     name="passoutYear"
      value={formData.passoutYear}
      onChange={handleChange}
      className=" p-3 mt-2 w-56 flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300" type="text" />
        <div className="w-56 text-red-700 text-[12px] ">
   {errors.passoutYear && (
           <span>{errors.passoutYear}*</span>
         )}
    
     </div>
    </div>
        </div>
        <div className='w-full'>
          <label htmlFor="" className=' font-medium '>Heard From</label>
          <br />
         <input 
          name="heardFrom"
      value={formData.heardFrom}
      onChange={handleChange} 
         className=" p-3 mt-2 w-full flex justify-center max-[568px]:w-11/12  text-gray-800  items-center border-[1px] rounded focus:outline-blue-500  border-gray-300" type="text" placeholder=' LinkedIn ' />
          <div className="w-56 text-red-700 text-[12px] ">
  
    
     </div>
        </div>
        <div className='flex gap-4 justify-end items-center'>
          <a>
            <div>Cancel</div>
          </a>
          <button className=" bg-blue-600 px-4 py-2 rounded-md text-white font-medium" onSubmit={handleSubmit} >Add Lead</button>
        </div>
       <div className=" flex justify-center items-center text-red-900 ">
        {apiResponse &&<div className="text-red-900 px-10 py-4 mt-5 mb-5 rounded-md bg-red-100 ">{apiResponse}</div>}
       
       </div>
    </form>
      </div>
    </div>
    </div>
   

  )
}

export default AddLead