import { useEffect, useState } from "react";
import { User, Mail, Phone } from "lucide-react";
import toast from "react-hot-toast";

import LoadingSpinner from "../components/LoadingSpinner";
import { getProfile } from "../services/profileService";

function Profile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            const data = await getProfile();

            setProfile(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load profile");

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <main className="min-h-screen bg-gray-100 py-16">

            <div className="mx-auto max-w-4xl">

                <div className="rounded-3xl bg-white p-10 shadow-xl">

                    {/* Profile Header */}

                    <div className="flex flex-col items-center">

                        {

                            profile.profile_picture ?

                            (

                                <img

                                    src={`http://127.0.0.1:8000${profile.profile_picture}`}

                                    alt="Profile"

                                    className="h-40 w-40 rounded-full border-4 border-blue-600 object-cover"

                                />

                            )

                            :

                            (

                                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-blue-100">

                                    <User

                                        size={70}

                                        className="text-blue-600"

                                    />

                                </div>

                            )

                        }

                        <h1 className="mt-6 text-4xl font-bold text-gray-900">

                            {profile.username}

                        </h1>

                        <p className="mt-2 text-lg text-gray-500">

                            ShopSphere Customer

                        </p>

                    </div>

                    {/* Information Cards */}

                    <div className="mt-12 grid gap-6 md:grid-cols-2">

                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

                            <div className="flex items-center gap-4">

                                <Mail className="text-blue-600" />

                                <div>

                                    <p className="text-sm text-gray-500">

                                        Email

                                    </p>

                                    <p className="font-semibold text-gray-900">

                                        {profile.email}

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

                            <div className="flex items-center gap-4">

                                <Phone className="text-blue-600" />

                                <div>

                                    <p className="text-sm text-gray-500">

                                        Phone Number

                                    </p>

                                    <p className="font-semibold text-gray-900">

                                        {

                                            profile.phone_number

                                                ? profile.phone_number

                                                : "Not Added"

                                        }

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>

    );

}

export default Profile;