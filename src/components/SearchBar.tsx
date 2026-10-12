interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: boolean;
}

export default function SearchBar({ value, onChange, placeholder, icon }: SearchBarProps) {
  return (
    <div className="header">
      <span className="header__logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="210" height="50" viewBox="0 0 170 50">
          <defs>
            <radialGradient id="discShine" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#2a2530" />
              <stop offset="100%" stopColor="#17141c" />
            </radialGradient>
          </defs>
          <g transform="translate(2,25)">
            <circle r="20" fill="url(#discShine)" stroke="#3a3440" strokeWidth="1" />
            <circle r="14" fill="none" stroke="#3a3440" strokeWidth="0.75" />
            <circle r="7" fill="#d9a441" />
            <circle r="1.2" fill="#17141c" />
            <path d="M -2,-3 L 3.5,0 L -2,3 Z" fill="#17141c" />
          </g>
          <text x="28" y="24" fontFamily="Georgia, 'Times New Roman', serif" fontSize="19" fontWeight="600" fill="#ece5d8" letterSpacing="0.3">
            Musique
          </text>
          <text xmlns="http://www.w3.org/2000/svg" x="28" y="42" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontSize="11" fill="#93412c" letterSpacing="3">
            YOUR RECORD SHELF
          </text>
        </svg>
      </span>

      <div className="header__search-bar">
        <div className="search-bar">
          {icon && (
            <span className="search-bar__icon">
              <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          )}
          
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder ?? "Search..."}
            className="search-bar__input"
          />
        </div>

        <span className="header__user">
          <img
            src="https://media.istockphoto.com/id/1460122390/photo/portrait-beauty-and-facial-with-a-black-woman-in-studio-to-promote-natural-skincare-or.jpg?s=612x612&w=0&k=20&c=WA6m1w260HXlEoaamK46jZTbdz5qbQR64HlTbN4dYlM="
            alt="User"
            width={46}
            height={46}
            className="user"
          />
        </span>
      </div>
    </div>
  );
}
