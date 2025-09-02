export default function Home(){
    return(
        <div className="Flex flex-col items-center justify-center h-screen bg-blue" >
            <h1 className="text-3xl font-bold text-blue-600"CampusCare></h1>
            <p className="text-gray-600 mt-2">Report & Track Campus Grievance</p>
            <div className="mt-5 space-x-4">
                <a href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Student</a>
                <a href="/admin" className="px-4 py-2 bg-green-500 text-white rounded-lg">Admin</a>

            </div>
        </div>
    );
}