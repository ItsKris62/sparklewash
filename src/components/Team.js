// src/components/Team.js
import React from 'react';
import TeamMember from './TeamMember';
import avatar1 from '../assets/images/avatar1.png'; // avatar image path
import avatar2 from '../assets/images/avatar1.png';
import avatar3 from '../assets/images/avatar2.png';
import avatar4 from '../assets/images/avatar2.png';

// Social media icons (replace with appropriate icons from your library)
const socialIcons = {
  twitter: (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
      {/* Twitter SVG Path */}
    </svg>
  ),
  linkedin: (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
      {/* LinkedIn SVG Path */}
    </svg>
  ),
  github: (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
      {/* GitHub SVG Path */}
    </svg>
  ),
};

const teamMembers = [
  {
    name: 'Christopher Rateng',
    role: '@senior_developer',
    avatar: avatar1,
    socialMedia: [
      { icon: socialIcons.github, link: 'https://github.com/tamani' },
      { icon: socialIcons.linkedin, link: 'https://linkedin.com/in/tamani' },
    ],
  },
  {
    name: 'Emmanuel Mberu',
    role: '@ui_ux_designer',
    avatar: avatar2,
    socialMedia: [
      { icon: socialIcons.twitter, link: 'https://twitter.com/johndoe' },
      { icon: socialIcons.linkedin, link: 'https://linkedin.com/in/johndoe' },
    ],
  },
  {
    name: 'Osawaru ',
    role: '@senior_backend_developer',
    avatar: avatar3,
    socialMedia: [
      { icon: socialIcons.twitter, link: 'https://twitter.com/janesmith' },
      { icon: socialIcons.github, link: 'https://github.com/janesmith' },
    ],
  },
  {
    name: 'Wellingtone',
    role: '@backend_developer',
    avatar: avatar4,
    socialMedia: [
      { icon: socialIcons.linkedin, link: 'https://linkedin.com/in/emilystone' },
      { icon: socialIcons.twitter, link: 'https://twitter.com/emilystone' },
    ],
  },
  {
    name: 'David ',
    role: '@frontend_developer',
    avatar: avatar3,
    socialMedia: [
      { icon: socialIcons.twitter, link: 'https://twitter.com/janesmith' },
      { icon: socialIcons.github, link: 'https://github.com/janesmith' },
    ],
  },
];

const Team = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {teamMembers.map((member, index) => (
        <TeamMember
          key={index}
          name={member.name}
          role={member.role}
          avatar={member.avatar}
          socialMedia={member.socialMedia}
        />
      ))}
    </div>
  );
};

export default Team;
