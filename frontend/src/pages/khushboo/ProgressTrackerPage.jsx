// ProgressTrackerPage.jsx — Khushboo
// Task: Progress Tracker — subject list with % update UI

import React, { useState, useEffect } from "react";
import "../../styles/khushboo.css";


function ProgressTrackerPage() {
  // Shuruat me state bilkul empty rahegi kyunki data backend se aana hai
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false); // Backend loading state ke liye

  // Yeh function tab chalega jab aap baad me backend API integrate karengi
  useEffect(() => {
    // const fetchTasks = async () => {
    //   setLoading(true);
    //   const response = await fetch('/api/progress');
    //   const data = await response.json();
    //   setTasks(data);
    //   setLoading(false);
    // };
    // fetchTasks();
  }, []);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Calculations tabhi hongi jab data array me kuch hoga
  const completedCount = tasks.filter(t => t.done).length;
  const percentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="progress-page">
      <div className="progress-page__container">
        
        {/* Header */}
        <div className="progress-page__header">
          <span className="progress-page__eyebrow">
            📈 PERFORMANCE REPORTING
          </span>
          <h1 className="progress-page__title">
            Progress Tracker
          </h1>
          <p className="progress-page__subtitle">
            Monitor syllabus alignment, milestones, and daily checklist items.
          </p>
        </div>

        {/* Dashboard Metrics */}
        <div className="progress-card">
          <div className="progress-card__meta">
            <h3 className="progress-card__heading">Syllabus Completion Rate</h3>
            <span className="progress-card__percentage">{percentage}%</span>
          </div>

          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          <p className="progress-card__summary">
            {completedCount} OF {tasks.length} SYLLABUS GATEWAYS COMPLETED
          </p>
        </div>

        {/* Checklist Section */}
        <h3 className="checklist-section-title">📋 Task Status Control Check</h3>
        
        {loading ? (
          <p className="checklist-placeholder">Loading academic directories...</p>
        ) : tasks.length === 0 ? (
          /* Jab backend connect nahi hai ya data khali hai, tab ye card dikhega */
          <div className="empty-checklist-card">
            <h4>No Active Syllabus Trackers</h4>
            <p>Your assigned academic modules and progress metrics will appear here once synchronized with the database.</p>
          </div>
        ) : (
          <div className="checklist-stack">
            {tasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className={`checklist-item ${task.done ? 'checklist-item--done' : ''}`}
              >
                <div className={`custom-checkbox ${task.done ? 'custom-checkbox--checked' : ''}`}>
                  {task.done && "✓"}
                </div>

                <div className="checklist-item__body">
                  <span className="checklist-item__category-tag">
                    {task.category?.toUpperCase()}
                  </span>
                  <span className={`checklist-item__text ${task.done ? 'checklist-item__text--crossed' : ''}`}>
                    {task.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default ProgressTrackerPage;