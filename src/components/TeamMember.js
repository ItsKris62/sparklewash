// src/components/TeamMember.js
import React from 'react';

const TeamMember = ({ name, role, avatar, socialMedia }) => {
  return (
    <div className="rounded-xl overflow-hidden relative text-center p-4 group items-center flex flex-col max-w-sm hover:shadow-2xl transition-all duration-500 shadow-xl">
      <div className="text-gray-500 group-hover:scale-105 transition-all">
        <img src={avatar} alt={`${name}'s avatar`} className="w-16 h-16 rounded-full" />
      </div>
      <div className="group-hover:pb-10 transition-all duration-500 delay-200">
        <h1 className="font-semibold text-gray-700">{name}</h1>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
      <div className="flex items-center transition-all duration-500 delay-200 group-hover:bottom-3 -bottom-full absolute gap-2 justify-evenly w-full">
        {socialMedia.map((social, index) => (
          <a key={index} href={social.link} className="hover:scale-110 transition-all duration-500 delay-200">
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TeamMember;
