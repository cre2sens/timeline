import React from 'react';
import useStore from '../../store/useStore';
import './VerticalTimeline.css';

export default function EventCard({ event, onFocus }) {
  const { locale } = useStore();
  const title = event.title[locale] || event.title.en || event.title.ko;
  const importanceClass = event.importance >= 5 ? 'tag-major' : 'tag-normal';

  return (
    <div 
      className={`vt-event-tag era-${event.era} ${importanceClass}`} 
      onClick={(e) => {
        e.stopPropagation();
        if (onFocus) onFocus(event);
      }}
    >
      <span className="vt-event-icon">{event.icon}</span>
      <span className="vt-event-title">{title}</span>
    </div>
  );
}
