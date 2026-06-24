import Header from "../components/Header.jsx";

export default function ProfilePage() {
    return (
        <>
            <Header />

            <div className="max-w-4xl mx-auto p-6 pt-32">
                <div className="bg-white shadow-xl rounded-2xl p-6 text-center">
                    <div className="h-40 w-40 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                        Photo
                    </div>

                    <h1 className="text-3xl font-bold mt-4 text-[#800020]">
                        Profile Details
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Profile page will display member details here.
                    </p>

                    <button className="mt-6 w-full bg-[#800020] text-white py-3 rounded-lg">
                        Send Interest
                    </button>
                </div>
            </div>
        </>
    );
}