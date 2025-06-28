import React from "react";
import AddLead from "./AddLead";
import LeadList from "./LeadList";

const App = () => {
  return (
    <div className="p-4 bg-black">
      <h1 className="text-2xl font-bold mb-4">Lead Enquiry Form</h1>
      {/* Lead form component here */}
     <div className=" w-full flex justify-center "> <AddLead/></div>
      {/* Lead list component here */}
      <LeadList/>
    </div>
  );
};

export default App;