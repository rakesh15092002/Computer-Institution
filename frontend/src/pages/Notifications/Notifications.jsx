import React, { useEffect, useState, useContext } from 'react';
import './Notifications.css';
import axios from 'axios';
import StoreContext from '../../context/StoreContext';
import { toast } from 'react-toastify';

const typeColorMap = {
  'Joined New User': 'green',
  'Message': 'orange',
  'Comment': 'purple',
  'Connect': 'skyblue',
};

const Notifications = () => {
  const { url } = useContext(StoreContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, [url]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/notifications`);
      if (res.data.success) {
        setNotifications(res.data.data);
      } else {
        toast.error('⚠️ Failed to load notifications');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      toast.error('❌ Error fetching notifications');
    }
    setLoading(false);
  };

  return (
    <div className="notifications-container">
      <h2>NOTIFICATIONS</h2>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <div className="notifications-list">
          {notifications.length > 0 ? (
            notifications.map((item, index) => (
              <div className="notification-card" key={index}>
                <span className={`tag ${typeColorMap[item.type] || 'default'}`}>
                  {item.type}
                </span>
                <h4 className="title">{item.title}</h4>
                <p className="desc">{item.desc}</p>
                <p className="user">{item.user}</p>
                <div className="timestamp">
                  🕒 <span>{item.time}</span>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>No notifications found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
