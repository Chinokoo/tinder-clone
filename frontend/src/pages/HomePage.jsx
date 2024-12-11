import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      HomePage
      <div>
        <button onClick={logout}>logout</button>
      </div>
    </div>
  );
};

export default HomePage;
