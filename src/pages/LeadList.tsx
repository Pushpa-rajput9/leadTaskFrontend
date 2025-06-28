
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

import React,{useEffect,useState,useCallback} from 'react'
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from 'primereact/tag';
import filterIcon from "../../assets/filter.svg"
import { NavLink, useNavigate } from "react-router-dom";
import AddLead from './AddLead';
function LeadList() {
   const [currentPage, setCurrentPage] = useState(0);

    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState(false);
   const [filters, setFilters] = useState([
  { field: '', value: '' }
]);
const [filterLogic, setFilterLogic] = useState("AND");

  const [query, setQuery] = useState(""); // Search query
  const [results, setResults] = useState([]); // Filtered search results
  const [leads, setLeads] = useState([]); // Full API data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const rowsPerPage = 7; // Number of rows per page
  // const navigate = useNavigate();
  const [apiResponse, setapiResponse] = useState({
      responseOK: "",
    apieEmailError: "",
    serverError: "",
  });
  const handleRefresh = () => {
    window.location.reload();
  };
 
 const handleDelete = async (id:Number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/lead/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    const contentType = response.headers.get("content-type");

    let result = {};
    if (contentType && contentType.includes("application/json")) {
      result = await response.json(); 
    } else {
      throw new Error("Unexpected response format: Not JSON");
    }

    if (response.ok) {
      console.log("✅ Lead deleted successfully.");
      window.location.reload();
      setapiResponse((prev) => ({
        ...prev,
        responseOK: "Lead deleted successfully",
      }));
    } else {
      console.error("❌ API Error:", result.message);
      setapiResponse((prev) => ({
        ...prev,
        apieEmailError: result.message,
      }));
    }
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    setapiResponse((prev) => ({
      ...prev,
      serverError: "Server error. Please try again later.",
    }));
  }
};


  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/lead/get`
      );
      if (!response.ok) throw new Error("Failed to fetch leads");

      const data = await response.json();
      setLeads(data);
      setResults(data); 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
const handleSearchChange = (e) => {
  const searchValue = e.target.value.toLowerCase(); // Normalize once
  setQuery(searchValue);

  if (!searchValue) {
    setResults(leads); 
    return;
  }

  const filteredResults = leads.filter((user) => {
    return (
      user.name?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue) ||
      user.phone?.toLowerCase().includes(searchValue)
    );
  });

  setResults(filteredResults);
};

 const applyAllFilters = () => {
  const filtered = leads.filter((lead) => {
    const conditions = filters.map((filter) => {
      if (!filter.field || !filter.value) return false;
      return lead[filter.field] === filter.value;
    });

    return filterLogic === "AND"
      ? conditions.every(Boolean)
      : conditions.some(Boolean);
  });

  setResults(filtered);
};


 const addFilter = () => {
  setFilters([...filters, { field: '', value: '' }]);
};

 const statusBodyTemplate = (rowData) => {
  const statusClass = rowData.status.toLowerCase().replace(/\s+/g, '-');
  return (
    <Tag
      value={rowData.status}
      severity={getLeadSeverity(rowData)}

      className={`custom-tag ${statusClass} capitalize`}
    />
  );
};

     const getLeadSeverity = (lead) => {
  switch (lead.status) {
    case 'New':
      return null;
    case 'Follow-Up':
      return null;
    case 'Qualified':
       return null;
    case 'Converted':
       return null; 
    default:
      return null;
  }
};

  const handleFieldChange = (index, e) => {
  const newFilters = [...filters];
  newFilters[index].field = e.target.value;
  newFilters[index].value = '';
  setFilters(newFilters);
};

const handleValueChange = (index, e) => {
  const newFilters = [...filters];
  newFilters[index].value = e.target.value;
  setFilters(newFilters);
};

  return (
  <div className='bg-gray-100  h-screen overflow-scroll overflow-x-hidden w-full'>
<div className='bg-white h-16 flex items-center justify-between px-5'>
 <div>
  <div className=' text-2xl font-bold text-black'>Leads</div>
  <div className='text-sm text-gray-500'>Manage and track your leads</div>
</div>
<NavLink to="">
 <button onClick={() => setVisible(true)} className=' bg-blue-600 px-4 py-2 rounded-md text-white font-medium'>
   + Add Lead
   </button>
 </NavLink>
  </div>
  {visible && (
        <div className=" w-full fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start overflow-auto z-50 pt-10 pb-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl relative">
            <button
              onClick={() => setVisible(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>

            <AddLead closeModal={() => setVisible(false)} />
          </div>
        </div>
      )}

     <div className=' px-5 bg-gray-100'>
      <div className='w-full  flex  items-center justify-between gap-3 mt-10'>
        <form action="" onSubmit={(e) => e.preventDefault()} className='w-11/12'>
          <input
          value={query}
           onChange={handleSearchChange}
          className='w-full pl-2 rounded-md border-2 border-gray-300 h-10 focus:outline-none bg-gray-100'
          placeholder='Search by name, email or phone...'
           type="text"  />
        </form>
        <button onClick={()=>{setFilter(!filter)}} className='bg-gray-100 border-2 border-gray-300 px-4 py-2 rounded-md flex items-center justify-center gap-2'>
           <img className='w-4 h-4' src={filterIcon} alt="" />
          <span className=' font-medium'>Filter </span></button>
      </div>
<div >
  {filter && (<div className='w-full bg-white rounded-lg mt-5 p-5 border-2 border-gray-300'>
    <div className='flex justify-between'>
    <div className=' text-xl font-bold text-black'>Advanced Filters</div>
     <button
              onClick={() => setFilter(false)}
              className="relative bottom-3 right-3 text-gray-800 hover:text-black text-2xl"
            >
              &times;
            </button>
    </div>
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <div className='flex gap-4 mt-2 text-lg text-black'>
        <label htmlFor="">Match</label>
        <input type="radio" name="match"
      value="AND"
      checked={filterLogic === "AND"}
      onChange={(e) => setFilterLogic(e.target.value)} id="" />
         <label htmlFor="">All conditions (AND)</label>
        <input type="radio"
         name="match"
      value="AND"
      checked={filterLogic === "AND"}
      onChange={(e) => setFilterLogic(e.target.value)} id="" />
         <label htmlFor="">Any condition (OR)</label>
      </div>

      {filters.map((filter, index) => (
  <div key={index} className="flex gap-4 flex-wrap mt-2">
    <select
      value={filter.field}
      onChange={(e) => handleFieldChange(index, e)}
      className="p-3 w-44 text-gray-800 border border-gray-300 rounded focus:outline-blue-500"
    >
      <option value="">Select Field</option>
      {Object.keys(leads[0] || {}).map((key) => (
        <option key={key} value={key}>
          {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
        </option>
      ))}
    </select>

    {filter.field && (
      <select
        value={filter.value}
        onChange={(e) => handleValueChange(index, e)}
        className="p-3 w-44 text-gray-800 border border-gray-300 rounded focus:outline-blue-500"
      >
        <option value="">Select {filter.field}</option>
        {[...new Set(leads.map((item) => item[filter.field]))]
          .filter(Boolean)
          .map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
      </select>
    )}
  </div>
))}

 <button
  onClick={addFilter}
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
>
  + Add Filter
</button>
    <button
  onClick={applyAllFilters}
  className="mt-4 ml-4 bg-black text-white px-4 py-2 rounded-md"
>
  Apply Filters
</button>
    </form>
  </div>)}
</div>
       <div className='rounded-t-2xl'>
          <DataTable
          className="mt-5 text-sm border-2 border-gray-200"
          value={results} 
          paginator
          rows={rowsPerPage}
          first={currentPage * rowsPerPage}
          onPage={(e) => setCurrentPage(e.first / e.rows)} 
          responsiveLayout="scroll"
        >
         
          <Column field="name" header="Name" sortable></Column>
          <Column
            field={"phone"}
            header="Cantact"
            sortable
          ></Column>
          <Column
         
            field="status"
            header="Status"
           sortable
           body={statusBodyTemplate}
          />
         
          <Column field="qualification" header="Qualification" sortable></Column>
          <Column field="interestField" header="Interest" sortable></Column>
          <Column field="source" header="Source" sortable></Column>
          <Column field="assignedTo" header="Assigned To" sortable></Column>
          <Column field="updated_at" header="Updated At" sortable></Column>
         <Column
    header="Actions"
    body={(rowData) => (
      <div className="flex gap-2">
        {/* <NavLink to={`/admin/updateArtist/${rowData.id}`}>
          <button className="text-blue-600 font-medium hover:underline">Edit</button>
        </NavLink> */}
        <button
          onClick={() => handleDelete(rowData.id)}
          className="text-red-600 font-medium hover:underline"
        >
          Delete 
        </button>
      </div>
    )}
  />
        </DataTable>

      </div>
     </div>
    </div>
  )
}

export default LeadList