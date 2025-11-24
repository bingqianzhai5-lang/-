import React from 'react';

export interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ElementType;
}

export interface TelemetryData {
  battery: number;
  wifiSignal: number;
  altitude: number;
  speed: number;
  distance: number;
  flightTime: string;
  remainingTime: string;
}

export interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}