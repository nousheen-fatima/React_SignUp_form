import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div>
      <p>Form is successfully submitted</p>
      <br />
      <Link to="/login">Login Now</Link>
    </div>
  );
}
