import React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function DateCalendarFormProps() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(135deg, cyan 0%, blue 100%)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '20px',
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateCalendar', 'DateCalendar']}>
            <DemoItem label="WAR Calendar" style={{ color: '#ffffff', fontWeight: 'bold' }}>
              <DateCalendar 
                defaultValue={dayjs('2022-04-17')} 
                readOnly 
                sx={{
                  '& .MuiPickersDay-dayWithMargin': {
                    color: '#ffffff',
                  },
                  '& .MuiPickersDay-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    '&:hover': {
                      backgroundColor: '#3b82f6',
                    },
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#1e40af !important',
                    color: '#ffffff !important',
                  },
                  '& .MuiDateCalendar-root': {
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                  },
                }} 
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
}
