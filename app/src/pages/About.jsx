// THIS PAGE IS NOT USED YET
import { useAuth } from '../store/hooks/useAuth';

export default function About() {
  const { user } = useAuth();
  return (
    <>
      {/* {
                Object.entries(user).map(info => (
                    <div>
                        {info[0]} {info[1]}
                    </div>))
            } */}
      <h3>ABOUT YOUUUU</h3>
      <h3>id: {user.id}</h3>
      <h3>username: {user.username}</h3>
      <h3>email: {user.email}</h3>
      <h3>date joined: {user.createdAt}</h3>
    </>
  );
}
