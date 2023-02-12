import { useNavigate } from "react-router-dom"
import { setIsFirstTimeUser } from "../redux/reducers/userSlice"
import { useDispatch } from "react-redux";
const GettingStarted = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const assignVisitor = () => {
    dispatch(setIsFirstTimeUser())
    navigate('/')
  }
  return (
    <div className="landing_pg">
      <button className="btn" onClick={() => assignVisitor()}>getting started </button>
    </div>
  );
}

export default GettingStarted;