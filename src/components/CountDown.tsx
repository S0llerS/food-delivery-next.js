"use client";

import React from 'react'
import Countdown from 'react-countdown';

const endingDate = new Date("2026.02.01")

const CountDown = () => {
  return (
    <Countdown date={endingDate} className='font-bold text-5xl text-yellow-300' />
  )
}

export default CountDown
