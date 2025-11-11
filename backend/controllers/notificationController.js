import pool from "../config/db.js";

export const getUserNotifications = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM notifications 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 50`,
      [req.user.id]
    );

    res.json({ success: true, notifications: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await pool.query(
      `UPDATE notifications SET lue = true, read_at = NOW() WHERE id = $1 AND user_id = $2`,
      [notificationId, req.user.id]
    );

    res.json({ success: true, message: "Notification marquée comme lue" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    await pool.query(
      `UPDATE notifications SET lue = true, read_at = NOW() WHERE user_id = $1 AND lue = false`,
      [req.user.id]
    );

    res.json({
      success: true,
      message: "Toutes les notifications marquées comme lues",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await pool.query(
      `DELETE FROM notifications WHERE id = $1 AND user_id = $2`,
      [notificationId, req.user.id]
    );

    res.json({ success: true, message: "Notification supprimée" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
