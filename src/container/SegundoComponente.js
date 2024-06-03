import React from 'react';
import cityData from './ocity.json';
import { TercerComponente } from '../pages/TercerComponente';

export const SegundoComponente = () => {
  const rawLinksInteres = cityData.data?.[0]?.links_interest || "[]";
  let linksinteres = [];

  try {
    linksinteres = JSON.parse(rawLinksInteres);
  } catch (error) {
    console.error("Error parsing links_interest:", error);
  }

  return (
    <div className='container max-width'>
      <div className='flex flex-row'>
        <a href="https://www.google.com" className='basis-1/4'>Countries</a>
        <a href="https://www.google.com" className='basis-1/4'>{cityData.data?.[0]?.country}</a>
        <a href="https://www.google.com" className='basis-1/4'>Comunidad Valenciana</a>
        <a href="https://www.google.com" className='basis-1/4'>{cityData.data?.[0]?.city_name_aux}</a>
      </div>
      <TercerComponente />
      <div className='flex flex-col mt-4'>
        <p><strong>Links of interest:</strong></p>
        {linksinteres.length > 0 ? (
          linksinteres.map((link, index) => (
            <div key={index} className='mb-2'>
              <p><strong>Description:</strong> {link.description}</p>
              <p><strong>URL:</strong> <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a></p>
            </div>
          ))
        ) : (
          <p>No links available</p>
        )}
      </div>
    </div>
  );
};
