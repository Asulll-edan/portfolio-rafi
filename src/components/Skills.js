'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Real brand SVG logos inline
const logos = {
  Laravel: () => (
    <svg viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01a.823.823 0 0 1-.089.042c-.011.005-.023.003-.034.007a.791.791 0 0 1-.2.028.791.791 0 0 1-.2-.028c-.012-.004-.024-.002-.035-.007a.823.823 0 0 1-.09-.042L.402 39.944A.8.8 0 0 1 0 39.25V6.334c0-.072.01-.143.028-.209.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.022.055-.047.088-.065h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.018.059.043.088.065.026.02.055.037.078.06.028.028.048.06.071.093.018.024.04.045.055.071.023.04.036.082.051.124.008.023.022.044.028.068a.809.809 0 0 1 .028.208v20.976l8.007-4.614v-10.96c0-.072.01-.143.028-.208.006-.024.02-.045.028-.068.015-.042.028-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.052-.04.078-.06.03-.022.056-.047.089-.065h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533c.034.018.06.043.09.065.025.02.054.037.077.06.028.028.048.061.072.093.018.024.04.045.054.071.023.039.036.082.051.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.644 2.678v9.124l8.007-4.614zm-9.61 16.505v-9.13l-4.57 2.619-13.05 7.4v9.216l17.62-10.105zM1.602 7.719v31.531l17.619 10.105v-9.216l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-.002-21.718L4.965 9.654 1.602 7.72zm8.81-5.994L2.405 6.334l8.005 4.613 8.006-4.613-8.006-4.609zm4.164 28.764l4.645-2.678V7.719l-3.363 1.936-4.645 2.678v20.092l3.363-1.936zM39.243 7.164l-8.006 4.614 8.006 4.613 8.005-4.613-8.005-4.614zm-.801 10.605l-4.644-2.678-3.363-1.936v9.124l4.644 2.678 3.363 1.937v-9.125zM20.02 38.33l11.743-6.704 5.87-3.35-8-4.61-9.211 5.303-8.395 4.833 7.993 4.528z" fill="#FF2D20"/>
    </svg>
  ),
  PHP: () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="28" height="22">
      <path d="M64 33.039c-33.74 0-61.094 13.862-61.094 30.961S30.26 94.961 64 94.961 125.094 81.099 125.094 64 97.74 33.039 64 33.039zm-14.552 45.55H38.42l2.7-13.837H30.494l-2.7 13.837H16.767l7.566-38.73h11.027l-2.622 13.827h10.626l2.622-13.827H58.62zm32.957-4.422c-2.503 5.698-7.44 8.222-13.797 8.222h-7.425l-2.226 11.372H47.93l7.566-38.73h18.272c7.171 0 11.136 4.119 9.54 11.605l-.903 7.531zm-7.38-5.004c.376-2.247.376-3.67-2.128-3.67h-5.627l-1.946 9.97h5.027c2.503 0 3.756-1.127 4.257-3.17zm43.374-15.072-2.7 13.837h-5.027l-2.503 12.36h-10.327l2.503-12.36h-5.128l2.7-13.837h-2.7l-1.946 9.97h-5.928l2.7-13.837h34.356z" fill="#777BB3"/>
    </svg>
  ),
  'Node.js': () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 42 42.061 42 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L20.1 90.777c-.428-.209-.743-.895-.743-1.228V38.407c0-.343.284-.734.655-.934l44.084-25.616c.353-.2.741-.2 1.093 0l44.06 25.616c.37.2.656.591.656.934v51.142c0 .333-.29.991-.71 1.205L65.227 117.104c-.35.196-.741.196-1.12-.027L52.66 110.29c-.349-.211-.894-.414-1.154-.261l-.059.033-9.532 5.634c-.261.153-.261.412 0 .567L64.48 128.16c1.326.814 3.091 1.003 4.512 1.003 1.398 0 3.186-.189 4.512-1.003l43.895-25.395c2.827-1.617 4.601-4.754 4.601-8.018V38.407c0-3.319-1.827-6.422-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.452 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.995 1.24.995h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.111-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.829 13.582 14.661 1.298 15.678 3.244 15.678 6.45-.001 4.984-4.093 7.002-13.561 7.002z"/>
    </svg>
  ),
  'REST API': () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path d="M3 7h18M3 12h18M3 17h12" stroke="#219EBC" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="20" cy="17" r="2.2" stroke="#FFC300" strokeWidth="1.6"/>
    </svg>
  ),
  'Next.js': () => (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <mask id="mask0_408_134" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black"/>
      </mask>
      <g mask="url(#mask0_408_134)">
        <circle cx="90" cy="90" r="90" fill="black"/>
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.3L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)"/>
        <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)"/>
      </g>
      <defs>
        <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path fill="#F7DF1E" d="M2 1h125v125H2z"/>
      <path fill="#000" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/>
    </svg>
  ),
  AJAX: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <circle cx="12" cy="12" r="9.5" stroke="#FFC300" strokeWidth="1.5"/>
      <path d="M9 12h6M13 9.5l2.5 2.5L13 14.5" stroke="#FFC300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 9l-2.5 3L11 15" stroke="#219EBC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'HTML & CSS': () => (
    <svg viewBox="0 0 52 30" xmlns="http://www.w3.org/2000/svg" width="36" height="22">
      <path d="M0 0l4.5 25.6L13 28l8.5-2.4L26 0H0z" fill="#E44D26"/>
      <path d="M13 25.2l6.8-1.9 3.7-20.8H13v22.7z" fill="#F16529"/>
      <path d="M13 11.5H8.5l-.3-3.1H13V5.2H5.2l.8 9H13v-2.7zM13 19.3l-.1.2-3.5-1-.2-2.5H6.9l.4 5.3 5.7 1.6V19.3z" fill="#EBEBEB"/>
      <path d="M13 11.5v2.7h4.1l-.4 4.4-3.7 1v3.1l5.7-1.6.6-6.8.2-2.8H13zM13 5.2v3.2h7.5l.3-3.2H13z" fill="#fff"/>
      <path d="M26 0l4.5 25.6L39 28l8.5-2.4L52 0H26z" fill="#1572B6"/>
      <path d="M39 25.2l6.8-1.9 3.7-20.8H39v22.7z" fill="#33A9DC"/>
      <path d="M39 13.9h4.3l-.4 4.5-3.9 1v3.1l5.8-1.6.4-4.2.5-5.5H39v2.7zM39 5.2v3.2h8.3l.2-3.2H39zM39 11.5h-4.4l-.3-3.1H39V5.2h-7.8l.8 9H39v-2.7zM39 19.3l-.1.2-3.5-1-.2-2.5h-3.3l.4 5.3 5.7 1.6V19.3z" fill="#fff"/>
    </svg>
  ),
  'Tailwind CSS': () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64z" fill="#38BDF8"/>
    </svg>
  ),
  Bootstrap: () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path fill="#7952B3" d="M8.695 0h110.61C123.85 0 128 4.152 128 9.273v109.454c0 5.12-4.152 9.273-9.273 9.273H8.695C3.574 128 0 123.848 0 118.727V9.273C0 4.152 3.574 0 8.695 0z"/>
      <path fill="#fff" d="M43.988 31.988H67.8c5.856 0 10.507.64 13.953 1.92 3.446 1.28 6.187 3.2 8.222 5.76 2.036 2.56 3.054 5.547 3.054 8.96 0 2.987-.784 5.76-2.35 8.32-1.566 2.56-3.867 4.694-6.903 6.4 4.267 1.494 7.467 3.84 9.6 7.04 2.133 3.2 3.2 6.827 3.2 10.88 0 3.733-.907 7.253-2.72 10.56-1.813 3.307-4.32 5.867-7.52 7.68-3.2 1.813-7.147 2.72-11.84 2.72H43.988zm12.8 27.52h8.747c4.053 0 6.933-.747 8.64-2.24 1.707-1.494 2.56-3.627 2.56-6.4 0-2.56-.8-4.48-2.4-5.76-1.6-1.28-4.267-1.92-8-1.92h-9.547zm0 26.88h10.24c4.48 0 7.68-.853 9.6-2.56 1.92-1.707 2.88-3.947 2.88-6.72 0-2.56-.96-4.587-2.88-6.08-1.92-1.493-4.96-2.24-9.12-2.24H56.788z"/>
    </svg>
  ),
  Flutter: () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path fill="#3fb6d3" d="M12.3 64.2L76.3 0h39.4L32.1 83.6z"/>
      <path fill="#27aacd" d="M76.3 128h39.4L81.6 93.9l34.1-34.8H76.3L42.2 93.5z"/>
      <path fill="#19599a" d="M81.6 93.9l-20-20-19.4 19.6 19.4 19.6z"/>
      <linearGradient id="fl-a" x1="75.6" y1="85" x2="42.5" y2="118" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#1b4e93"/>
        <stop offset=".63" stopColor="#1a5497"/>
        <stop offset="1" stopColor="#195a9b"/>
      </linearGradient>
      <path fill="url(#fl-a)" d="M62.1 107.5l19.5-13.6-19.4-19.6-19.5 19.6z"/>
    </svg>
  ),
  Dart: () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path fill="#00B4AB" d="M90.8 0H37.3L0 37.3v53.3l37.3 37.3h53.3L128 90.6V37.3z"/>
      <path fill="#fff" d="M70.3 96.2H44V71.4l26.3-26.3h25.5v25.5L70.3 96.2zM57.7 31.8H32.2v25.5l25.5-25.5z"/>
    </svg>
  ),
  PostgreSQL: () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path fill="#336791" d="M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938 6.191-2.873 9.861-7.668 3.758-6.409-13.924 2.873-14.881-1.842-14.881-1.842 14.703-21.815 20.849-49.508 15.543-56.287-14.47-18.489-39.517-9.746-39.936-9.504l-.134.025c-2.751-.571-5.83-.911-9.291-.967-6.301-.103-11.082 1.652-14.709 4.402 0 0-44.683-18.409-42.604 23.151.442 8.841 12.672 66.898 27.26 49.362 5.332-6.412 10.484-11.834 10.484-11.834 2.558 1.699 5.622 2.567 8.834 2.255l.249-.212c-.078.796-.044 1.575.099 2.497-3.757 4.199-2.653 4.936-10.166 6.482-7.602 1.566-3.136 4.355-.221 5.084 3.535.884 11.712 2.136 17.238-5.598l-.22.882c1.474 1.18 1.375 8.477 1.583 13.69.209 5.214.558 10.13 1.621 13.004 1.063 2.876 2.319 10.261 12.192 8.14 8.252-1.764 14.455-4.338 15.054-28.165"/>
      <path fill="#fff" d="M85.807 14.804c1.077.217 1.903.573 1.903.573s-1.26.616-3.36 3.197c-.9 1.11-1.79 2.26-2.622 3.454-1.484 2.125-2.893 4.297-4.124 6.542-2.447 4.437-4.47 9.247-5.724 14.248-.623 2.5-1.063 5.054-1.222 7.623-.077 1.282-.077 2.577.026 3.857.036.447.07.893.14 1.337l.18.85c.103.43.299.863.479 1.286.105.253.243.501.366.751l.195.37.293.359c.194.24.384.478.59.706l.625.594.289.231.313.2c.422.261.844.518 1.272.75l1.303.617c.882.395 1.791.73 2.709 1.04 1.838.615 3.738 1.097 5.666 1.481 1.934.38 3.896.661 5.876.82-.069-.07-.147-.148-.226-.231-3.108-3.163-3.879-6.904-3.879-6.904-.17 3.498.375 6.527 1.244 9.084l-4.196-.793c-.453-3.174-.618-6.445-.524-9.724-.107-.134-.22-.273-.32-.406-.78-1.019-1.368-2.158-1.723-3.353l-.113-.36c-.119-.394-.25-.909-.347-1.387l-.14-.803c-.052-.379-.099-.759-.123-1.14-.069-1.07-.049-2.144.039-3.212.176-2.136.604-4.247 1.178-6.313 1.176-4.133 2.982-8.098 5.165-11.833 1.088-1.867 2.24-3.704 3.485-5.492.625-.894 1.281-1.771 1.955-2.638z"/>
    </svg>
  ),
  MySQL: () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="28" height="22">
      <path fill="#00618A" d="M2 5.3h21.1L40.4 47l18.4-41.7H80V60H65.6V22.6L46.1 60H35L15.3 22.6V60H2zM84.7 5.3h15.5l18 54.7H103l-3.5-10.7H79.9L76.4 60H61.7zm-1.3 33h14.3l-7.1-22.1z"/>
      <path fill="#E48E00" d="M117.7 51.8v8.5h-8.5v-8.5zM2 65.6h12.1l27.4 37.9V65.6H55v57.1H42.8L15.4 84.9v37.8H2zm60.3 0h29c13.9 0 22 8.4 22 28.8 0 21.1-8.8 28.3-22.6 28.3H62.3zm13.3 10.8v33.6h14c7.7 0 10.4-5.4 10.4-16.5 0-11.9-2.7-17.1-11-17.1z"/>
    </svg>
  ),
  DBeaver: () => (
    <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <rect width="128" height="128" rx="24" fill="#3E3E40"/>
      <ellipse cx="64" cy="68" rx="36" ry="20" fill="#9B72CF" opacity="0.7"/>
      <ellipse cx="64" cy="54" rx="36" ry="20" fill="#B48FE0"/>
      <ellipse cx="64" cy="40" rx="36" ry="20" fill="#C8A2E8"/>
      <ellipse cx="64" cy="40" rx="22" ry="11" fill="#8B5FBF" opacity="0.5"/>
      <circle cx="76" cy="35" r="5" fill="#FFC300"/>
      <circle cx="52" cy="44" r="3" fill="#fff" opacity="0.5"/>
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="28" height="22">
      <path fill="#019BC6" d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.6 3.1-3.4 8.3-3 12.3-1.5-.9-3.5-1.3-5.2-1.3H2l-.3 1.9c-.9 6.3 0 14.3 4.5 19.8 4.1 5 9.9 7.5 17.8 7.5 16.9 0 29.4-7.8 35.3-22 4.1.2 8.3.1 11.6-2.1 3.1-2 5-5.1 5.8-9.5h1l.1 1.3c.1 3.7.9 9.9 4.5 13.4l1.5 1.4 1.5-1.4c3.1-2.9 4.9-7.6 5.5-13.5 2.8.7 5.5 2.3 7.2 4.5 3.3 4.4 3.7 10.7 2.7 15.6l-.3 1.6h1.6c3.1 0 7.5-.9 10-3.6 2.4-2.6 3.2-6.5 2.9-12.1z"/>
      <path fill="#019BC6" d="M27 55H15c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V56c0-.6-.4-1-1-1zm15 0H30c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V56c0-.6-.4-1-1-1zm15 0H45c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V56c0-.6-.4-1-1-1zm15 0H60c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V56c0-.6-.4-1-1-1zM27 40H15c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V41c0-.6-.4-1-1-1zm15 0H30c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V41c0-.6-.4-1-1-1zm15 0H45c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V41c0-.6-.4-1-1-1zm15 0H60c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V41c0-.6-.4-1-1-1zM42 25H30c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V26c0-.6-.4-1-1-1zm15 0H45c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V26c0-.6-.4-1-1-1z"/>
    </svg>
  ),
};

const skillCategories = [
  {
    key: 'backend',
    label: 'Backend',
    color: '#219EBC',
    skills: ['Laravel', 'PHP', 'Node.js', 'REST API'],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    color: '#FFC300',
    skills: ['Next.js', 'JavaScript', 'AJAX', 'HTML & CSS', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    key: 'mobile',
    label: 'Mobile',
    color: '#FFC300',
    skills: ['Flutter', 'Dart'],
  },
  {
    key: 'database',
    label: 'Database',
    color: '#219EBC',
    skills: ['PostgreSQL', 'MySQL', 'DBeaver'],
  },
  {
    key: 'tools',
    label: 'Tools',
    color: '#219EBC',
    skills: ['Docker'],
  },
];

function SkillCard({ name, color, index }) {
  const [hovered, setHovered] = useState(false);
  const Logo = logos[name];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(0,53,102,0.5)' : 'rgba(0,29,61,0.28)',
        border: `1px solid ${hovered ? color + '50' : 'rgba(255,195,0,0.09)'}`,
        borderRadius: '16px',
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        cursor: 'default',
        transition: 'all 0.22s ease',
        backdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? `0 8px 28px rgba(0,0,0,0.3), inset 0 1px 0 ${color}18`
          : 'inset 0 1px 0 rgba(255,255,255,0.03)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* hover glow */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 20% 50%, ${color}0a 0%, transparent 65%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* logo box */}
      <div style={{
        width: '42px',
        height: '42px',
        borderRadius: '12px',
        background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.22s',
      }}>
        {Logo && <Logo />}
      </div>

      {/* name */}
      <span style={{
        fontFamily: "'DM Sans', 'Syne', sans-serif",
        fontSize: '14px',
        fontWeight: 500,
        color: hovered ? '#F0F4F8' : 'rgba(240,244,248,0.6)',
        transition: 'color 0.2s',
        letterSpacing: '-0.01em',
        flex: 1,
      }}>
        {name}
      </span>

      {/* accent dot */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.18 }}
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState('backend');
  const activeCategory = skillCategories.find(c => c.key === activeTab);

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        backgroundColor: 'var(--bg-main)',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ambient glows */}
      <div style={{
        position: 'absolute', top: '35%', right: '10%',
        width: '480px', height: '480px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(33,158,188,0.055) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '5%',
        width: '380px', height: '380px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,195,0,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: '52px' }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: '#219EBC',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}>02 / Skills</span>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 800,
            color: '#F0F4F8',
            margin: '8px 0 0',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
          }}>
            My{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FFC300 20%, #219EBC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Stack</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.12 }}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}
        >
          {skillCategories.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: isActive ? cat.color : 'rgba(0,29,61,0.4)',
                  border: `1px solid ${isActive ? cat.color : 'rgba(255,195,0,0.1)'}`,
                  borderRadius: '8px',
                  padding: '9px 22px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isActive ? '#001D3D' : 'rgba(240,244,248,0.45)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(8px)',
                  letterSpacing: '0.01em',
                }}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: '10px',
            }}
          >
            {activeCategory.skills.map((name, i) => (
              <SkillCard
                key={name}
                name={name}
                color={activeCategory.color}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}