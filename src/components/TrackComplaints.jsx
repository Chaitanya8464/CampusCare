import React, {useState} from "react";
import { Link } from "react-router-dom";
export default function TrackComplaints() {
    const[ticketId,setTicketId] = useState("");
    
    // dummy data( later we can featch from backend)
    const complaints=[
        {
            id:"C12345",
            title:"Broken Wi-Fi in Library",
            department:"IT Services",
            date:"2023-09-15",
            status:"In Progress"
        },
        {
            id:"C12346",
            title:"AC not working",
            department:"Maintenance",
            date:"2023-09-16",
            status:"Resolved"
        },
        {
            id:"C12347",
            title:"Elevator malfunction",
            department:"Maintenance",
            date:"2023-09-17",
            status:"In Progress"
        },
    ];
    const getStatusColor=(status)=> {
        switch(status){
            case "In Progress":
                return "bg-yellow-200 text-yellow-800";
            case "Resolved":
                return "bg-green-200 text-green-800";
            case "Pending":
                return "bg-blue-200 text-blue-800";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };
    return(
         <div className="min-h-screen bg-white  p-6 flex items-center justify-center">
           <div className="w-full max-w-3xl bg-gray shadow-lg rounded-lg">
            {/* Header Tab*/}
            <div className="flex justify-center gap-6 mb-8">
                <Link 
                to="/" 
                className="px-6 py-2 rounded-full bg-white text-black flex items-center gap-2"
                >
                Submit Complaint
                </Link>
            
                <Link 
                to="/track" 
                className="px-6 py-2 rounded-full bg-black text-white flex items-center gap-2"
                >
                Track Complaint
                </Link>
                <Link 
                to="/cancel" 
                className="px-6 py-2 rounded-full bg-gray-100 flex items-center gap-2"
                >
                Cancel
                </Link>
            </div>
            {/* Search */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-lg font-semibold mb-2">Track Your Complaint</h2>
                <input
                type="text"
                placeholder="e.g C12345"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2 bg-gray-50"
                />
                <button className="px-4 py-2 bg-black text-white rounded-lg">Search</button>
                
            </div>
            {/* Recent complaint*/}

        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2"> Recent Complaints</h2>
            <p className="text-gray-500 text-sm mb-3">
                Latest complaints you have submitted.
            </p>
            <div className="space-y-3">
               {complaints.map((c, index) => (
            <div
              key={index}
              className="flex justify-between items-start border rounded-lg p-4 hover:shadow"
            >
              <div>
                <p className="font-medium">
                  {c.title}{" "}
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(
                      c.status
                    )}`}
                  >
                    {c.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  ID: {c.id} • {c.department} • {c.date}
                </p>
              </div>
              <button className="text-blue-600 hover:underline">View</button>
            </div>
          ))}
        </div>
</div>
          </div>
        </div>
    );
}