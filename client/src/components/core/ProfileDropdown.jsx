import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export default function ProfileDropdown({ onLogout }) {
  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  const avatarUrl =
    user?.image ||
    `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName || "Story"} ${
      user?.lastName || "Teller"
    }`;

  const handleDashboard = () => {
    setOpen(false);
    navigate("/");
  };

  const handleLogout = () => {
    setOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button className="profile-dropdown" onClick={() => setOpen((prev) => !prev)}>
      <div className="profile-dropdown__trigger">
        <img src={avatarUrl} alt={`profile-${user?.firstName}`} className="profile-dropdown__avatar" />
        <AiOutlineCaretDown className="profile-dropdown__icon" />
      </div>
      {open && (
        <div
          className="profile-dropdown__menu"
          ref={ref}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleDashboard}
            className="profile-dropdown__item"
          >
            <VscDashboard className="profile-dropdown__item-icon" />
            Dashboard
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="profile-dropdown__item"
          >
            <VscSignOut className="profile-dropdown__item-icon" />
            Logout
          </button>
        </div>
      )}
    </button>
  );
}

