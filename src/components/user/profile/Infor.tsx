type user= {
        id: string;
        email: string;
        name: string | null;
        password: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        phoneNumber: string | null;
        date: string | null;
    } | null

export default function Infor({user}:{user:user}){
   
    return(
        
        <div className="w-1/2 min-w-72 flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-3 pt-3 text-2xl font-semibold">
                    <p className="">{user?.name}</p>
                    <img className="w-7" src="https://ardslot.com/s/vi.svg" alt="country-img" />
            </div>
        
            <div className="flex flex-col w-full m-5 p-3 border-2 rounded-lg ">
                
                    <div 
                            className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50  "
                        >
                            <p><strong>Email</strong></p>
                            <div
                            className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50  ">
                            {user?.email}</div>
                        </div>
                    
                    <div 
                        className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50  "
                    >
                        <p><strong>Password</strong></p>
                        <div
                        className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50  ">
                        *********</div>
                    </div>
                    <div 
                        className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50  "
                    >
                        <p><strong>Birthday</strong></p>
                        <div
                        className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50  ">
                        {user?.date||''}
                        </div>
                    </div>
                    <div 
                        className="justify-around w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50  "
                    >
                        <p><strong>Phone</strong></p>
                        <div
                        className="justify-around h-1/2 w-full p-2 my-3 border-2 border-gray-100 rounded-xl bg-gray-50 font-large text-lg shadow transition-transform duration-300 hover:bg-blue-10 hover:border-blue-50  ">
                        {user?.phoneNumber||''}
                        </div>
                    </div>
                </div>
        </div>
    )
}