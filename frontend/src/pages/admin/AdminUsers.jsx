import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import LoadingSpinner from "../../components/LoadingSpinner";

import {
    getUsers,
    updateUser,
} from "../../services/adminUserService";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadUsers();

    }, []);

    async function loadUsers() {

        try {

            const data = await getUsers();

            setUsers(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load users");

        }

        finally {

            setLoading(false);

        }

    }

    async function handleUpdate(id, is_staff) {

        try {

            await updateUser(id, is_staff);

            toast.success("User updated successfully");

            loadUsers();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to update user");

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div>

            <h1 className="mb-8 text-4xl font-bold">

                User Management

            </h1>

            <div className="overflow-hidden rounded-2xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-5 py-4 text-left">

                                ID

                            </th>

                            <th className="px-5 py-4 text-left">

                                Email

                            </th>

                            <th className="px-5 py-4 text-left">

                                Admin

                            </th>

                            <th className="px-5 py-4 text-left">

                                Joined

                            </th>

                            <th className="px-5 py-4 text-left">

                                Action

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            users.map((user) => (

                                <tr
                                    key={user.id}
                                    className="border-t"
                                >

                                    <td className="px-5 py-4">

                                        {user.id}

                                    </td>

                                    <td className="px-5 py-4">

                                        {user.email}

                                    </td>

                                    <td className="px-5 py-4">

                                        <select

                                            value={user.is_staff ? "true" : "false"}

                                            onChange={(e) => {

                                                const updatedUsers = users.map((u) =>

                                                    u.id === user.id

                                                        ? {

                                                            ...u,

                                                            is_staff: e.target.value === "true",

                                                        }

                                                        : u

                                                );

                                                setUsers(updatedUsers);

                                            }}

                                            className="rounded border px-2 py-1"

                                        >

                                            <option value="false">

                                                User

                                            </option>

                                            <option value="true">

                                                Admin

                                            </option>

                                        </select>

                                    </td>

                                    <td className="px-5 py-4">

                                        {new Date(user.date_joined).toLocaleDateString()}

                                    </td>

                                    <td className="px-5 py-4">

                                        <button

                                            onClick={() =>

                                                handleUpdate(

                                                    user.id,

                                                    user.is_staff

                                                )

                                            }

                                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"

                                        >

                                            Update

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminUsers;