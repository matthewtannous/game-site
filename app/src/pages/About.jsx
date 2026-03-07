import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function About() {
    const { user } = useContext(AuthContext);
    return (
        <>
            <h3>ABOUT YOUUUU</h3>
            <h3>id: {user.id}</h3>
            <h3>username: {user.username}</h3>
            <h3>email: {user.email}</h3>
            <h3>date joined: {user.createdAt}</h3>
        </>
    )
}