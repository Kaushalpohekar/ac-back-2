const db = require('../db');

function fetchStatus(req, res) {
  const deviceStatusQuery = 'select * from ahu_control order by date_time DESC LIMIT 1';
  try {
    db.query(deviceStatusQuery, (error, status) => {
      if (error) {
        console.error('Error during Status check:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(200).json(status);
    });
  } catch (error) {
    console.error('Error in Status check:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/*function fetchOnOffTimings(req, res) {
  const deviceStatusQuery = 'select * from ahu_control order by date_time ASC';
  try {
    db.query(deviceStatusQuery, (error, data) => {
      if (error) {
        console.error('Error during data fetch:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      const onOffTimings = [];
      let previousStatus = null;
      let previousTimestamp = null;

      for (const entry of data) {
        if (entry.ledState === 'on' && previousStatus === 'off') {
          const timeDifference = new Date(entry.date_time) - previousTimestamp;
          onOffTimings.push(timeDifference);
        }
        previousStatus = entry.ledState;
        previousTimestamp = new Date(entry.date_time);
      }

      const totalOnTime = onOffTimings
        .filter((interval, index) => index % 2 === 0)
        .reduce((acc, val) => acc + val, 0);

      const totalOffTime = onOffTimings
        .filter((interval, index) => index % 2 !== 0)
        .reduce((acc, val) => acc + val, 0);

      const formatTime = milliseconds => {
        const seconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m ${seconds % 60}s`;
      };

      res.status(200).json({
        on: formatTime(totalOnTime),
        off: formatTime(totalOffTime)
      });
    });
  } catch (error) {
    console.error('Error in data fetch:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}*/
function fetchOnOffTimings(req, res) {
  const deviceStatusQuery = 'select * from ahu_control order by date_time ASC';
  try {
    db.query(deviceStatusQuery, (error, data) => {
      if (error) {
        console.error('Error during data fetch:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      const onOffTimings = [];
      let previousStatus = null;
      let previousTimestamp = null;

      for (const entry of data) {
        if (entry.ledState === 'on' && previousStatus === 'off') {
          const timeDifference = (new Date(entry.date_time) - previousTimestamp) / (1000 * 60); // Convert to minutes
          onOffTimings.push(timeDifference);
        }
        previousStatus = entry.ledState;
        previousTimestamp = new Date(entry.date_time);
      }

      const totalOnTimeMinutes = onOffTimings
        .filter((interval, index) => index % 2 === 0)
        .reduce((acc, val) => acc + val, 0);

      const totalOffTimeMinutes = onOffTimings
        .filter((interval, index) => index % 2 !== 0)
        .reduce((acc, val) => acc + val, 0);

      res.status(200).json({
        on: totalOnTimeMinutes,
        off: totalOffTimeMinutes
      });
    });
  } catch (error) {
    console.error('Error in data fetch:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



module.exports = {
  fetchStatus,
  fetchOnOffTimings
};
