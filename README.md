<svg viewBox="0 0 1400 900" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1400" height="900" fill="#ffffff"/>
  
  <!-- Title -->
  <text x="700" y="40" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="#1a1a1a">
    UniNavi Service Architecture
  </text>
  
  <!-- Define arrow markers -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#333"/>
    </marker>
    <marker id="arrow-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#2196F3"/>
    </marker>
    <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#4CAF50"/>
    </marker>
  </defs>
  
  <!-- Client Layer -->
  <g id="client">
    <rect x="50" y="80" width="240" height="340" rx="12" fill="#E3F2FD" stroke="#2196F3" stroke-width="3"/>
    <text x="170" y="115" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" fill="#1565C0">
      🔷 Client Layer
    </text>
    
    <!-- NFC Tag -->
    <rect x="80" y="145" width="180" height="85" rx="8" fill="#ffffff" stroke="#2196F3" stroke-width="2"/>
    <text x="170" y="170" font-family="Arial" font-size="15" font-weight="bold" text-anchor="middle" fill="#1976D2">
      NFC/QR Tag
    </text>
    <text x="170" y="190" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">
      NTAG213
    </text>
    <text x="170" y="210" font-family="Arial" font-size="11" text-anchor="middle" fill="#888">
      Building Entrance
    </text>
    
    <!-- Mobile Device -->
    <rect x="80" y="255" width="180" height="145" rx="8" fill="#ffffff" stroke="#2196F3" stroke-width="2"/>
    <text x="170" y="280" font-family="Arial" font-size="15" font-weight="bold" text-anchor="middle" fill="#1976D2">
      Mobile/Desktop
    </text>
    <text x="170" y="302" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">
      Web Browser
    </text>
    <text x="170" y="325" font-family="Arial" font-size="11" text-anchor="middle" fill="#888">
      • PWA Support
    </text>
    <text x="170" y="345" font-family="Arial" font-size="11" text-anchor="middle" fill="#888">
      • Responsive Design
    </text>
    <text x="170" y="365" font-family="Arial" font-size="11" text-anchor="middle" fill="#888">
      • Push Notification
    </text>
    <text x="170" y="385" font-family="Arial" font-size="11" text-anchor="middle" fill="#888">
      • Offline Support
    </text>
  </g>
  
  <!-- Frontend Layer -->
  <g id="frontend">
    <rect x="360" y="80" width="280" height="340" rx="12" fill="#FFF3E0" stroke="#FF9800" stroke-width="3"/>
    <text x="500" y="115" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" fill="#E65100">
      🔶 Frontend Layer
    </text>
    
    <!-- React -->
    <rect x="390" y="145" width="220" height="70" rx="8" fill="#61DAFB" stroke="#00D8FF" stroke-width="2"/>
    <text x="500" y="175" font-family="Arial" font-size="15" font-weight="bold" text-anchor="middle" fill="#000">
      React.js
    </text>
    <text x="500" y="195" font-family="Arial" font-size="11" text-anchor="middle" fill="#000">
      Component-based UI
    </text>
    
    <!-- UI Components -->
    <rect x="390" y="235" width="220" height="85" rx="8" fill="#ffffff" stroke="#FF9800" stroke-width="2"/>
    <text x="500" y="260" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#E65100">
      UI/UX Components
    </text>
    <text x="500" y="280" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      HTML5 / CSS3
    </text>
    <text x="500" y="298" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      JavaScript (ES6+)
    </text>
    
    <!-- Axios -->
    <rect x="390" y="340" width="220" height="60" rx="8" fill="#ffffff" stroke="#FF9800" stroke-width="2"/>
    <text x="500" y="370" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#E65100">
      Axios
    </text>
    <text x="500" y="388" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      HTTP Client
    </text>
  </g>
  
  <!-- Backend Layer -->
  <g id="backend">
    <rect x="710" y="80" width="300" height="340" rx="12" fill="#E8F5E9" stroke="#4CAF50" stroke-width="3"/>
    <text x="860" y="115" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" fill="#1B5E20">
      🔷 Backend Layer
    </text>
    
    <!-- Spring Boot -->
    <rect x="740" y="145" width="240" height="70" rx="8" fill="#6DB33F" stroke="#5CA632" stroke-width="2"/>
    <text x="860" y="175" font-family="Arial" font-size="15" font-weight="bold" text-anchor="middle" fill="#fff">
      Spring Boot
    </text>
    <text x="860" y="195" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">
      Java Framework
    </text>
    
    <!-- Business Logic -->
    <rect x="740" y="235" width="240" height="100" rx="8" fill="#ffffff" stroke="#4CAF50" stroke-width="2"/>
    <text x="860" y="260" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#1B5E20">
      Business Logic
    </text>
    <text x="860" y="280" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      • Real-time Status Processing
    </text>
    <text x="860" y="298" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      • Data Transformation
    </text>
    <text x="860" y="316" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      • Spring Data JPA (ORM)
    </text>
    
    <!-- Security & API -->
    <rect x="740" y="355" width="115" height="45" rx="8" fill="#ffffff" stroke="#4CAF50" stroke-width="2"/>
    <text x="797" y="380" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#1B5E20">
      Spring Security
    </text>
    
    <rect x="865" y="355" width="115" height="45" rx="8" fill="#ffffff" stroke="#4CAF50" stroke-width="2"/>
    <text x="922" y="372" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#1B5E20">
      RESTful API
    </text>
    <text x="922" y="388" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
      30+ endpoints
    </text>
  </g>
  
  <!-- Database Layer -->
  <g id="database">
    <rect x="1080" y="80" width="270" height="340" rx="12" fill="#E1F5FE" stroke="#03A9F4" stroke-width="3"/>
    <text x="1215" y="115" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" fill="#01579B">
      🔷 Database Layer
    </text>
    
    <!-- MySQL -->
    <rect x="1110" y="145" width="210" height="70" rx="8" fill="#00758F" stroke="#00546B" stroke-width="2"/>
    <text x="1215" y="175" font-family="Arial" font-size="15" font-weight="bold" text-anchor="middle" fill="#fff">
      MySQL 8.0
    </text>
    <text x="1215" y="195" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">
      Relational Database
    </text>
    
    <!-- Data Schema -->
    <rect x="1110" y="235" width="210" height="165" rx="8" fill="#ffffff" stroke="#03A9F4" stroke-width="2"/>
    <text x="1215" y="260" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#01579B">
      Data Schema
    </text>
    <text x="1215" y="285" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      • Building Information
    </text>
    <text x="1215" y="305" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      • Classroom Details
    </text>
    <text x="1215" y="325" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      • Course Timetable
    </text>
    <text x="1215" y="345" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      • Professor Information
    </text>
    <text x="1215" y="365" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      • User Data & Preferences
    </text>
    <text x="1215" y="385" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
      • Usage Statistics
    </text>
  </g>
  
  <!-- Data Flow Arrows -->
  <!-- Client to Frontend -->
  <path d="M 290 250 L 360 250" stroke="#2196F3" stroke-width="3" fill="none" marker-end="url(#arrow-blue)"/>
  <text x="325" y="240" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#1565C0">
    HTTPS
  </text>
  <text x="325" y="255" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Request
  </text>
  
  <!-- Frontend to Backend -->
  <path d="M 640 250 L 710 250" stroke="#FF9800" stroke-width="3" fill="none" marker-end="url(#arrow)"/>
  <text x="675" y="240" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#E65100">
    API Call
  </text>
  <text x="675" y="255" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    JSON
  </text>
  
  <!-- Backend to Database -->
  <path d="M 1010 250 L 1080 250" stroke="#4CAF50" stroke-width="3" fill="none" marker-end="url(#arrow-green)"/>
  <text x="1045" y="240" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#1B5E20">
    JPA/SQL
  </text>
  <text x="1045" y="255" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Query
  </text>
  
  <!-- Return arrows -->
  <path d="M 1080 280 L 1010 280" stroke="#4CAF50" stroke-width="2" fill="none" marker-end="url(#arrow-green)" stroke-dasharray="5,5"/>
  <text x="1045" y="295" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Data
  </text>
  
  <path d="M 710 280 L 640 280" stroke="#FF9800" stroke-width="2" fill="none" marker-end="url(#arrow)" stroke-dasharray="5,5"/>
  <text x="675" y="295" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Response
  </text>
  
  <!-- NFC to Mobile arrow -->
  <path d="M 170 230 L 170 255" stroke="#2196F3" stroke-width="2" fill="none" marker-end="url(#arrow-blue)"/>
  <text x="195" y="245" font-family="Arial" font-size="10" text-anchor="start" fill="#1565C0">
    Tag URL
  </text>
  
  <!-- Infrastructure Layer -->
  <rect x="50" y="470" width="1300" height="200" rx="12" fill="#FCE4EC" stroke="#E91E63" stroke-width="3"/>
  <text x="700" y="505" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" fill="#880E4F">
    🔶 Infrastructure (AWS Cloud)
  </text>
  
  <!-- NGINX -->
  <rect x="100" y="535" width="180" height="110" rx="8" fill="#009639" stroke="#007A2D" stroke-width="2"/>
  <text x="190" y="565" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">
    NGINX
  </text>
  <text x="190" y="588" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">
    • Reverse Proxy
  </text>
  <text x="190" y="606" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">
    • SSL/HTTPS
  </text>
  <text x="190" y="624" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">
    • Load Balancing
  </text>
  
  <!-- EC2 -->
  <rect x="320" y="535" width="180" height="110" rx="8" fill="#FF9900" stroke="#CC7700" stroke-width="2"/>
  <text x="410" y="565" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">
    AWS EC2
  </text>
  <text x="410" y="588" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">
    • Backend Server
  </text>
  <text x="410" y="606" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">
    • Application Host
  </text>
  <text x="410" y="624" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">
    • Auto Scaling
  </text>
  
  <!-- RDS -->
  <rect x="540" y="535" width="180" height="110" rx="8" fill="#3B48CC" stroke="#2C3699" stroke-width="2"/>
  <text x="630" y="565" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">
    AWS RDS
  </text>
  <text x="630" y="588" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">
    • MySQL Database
  </text>
  <text x="630" y="606" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">
    • Managed Service
  </text>
  <text x="630" y="624" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">
    • Auto Backup
  </text>
  
  <!-- Monitoring -->
  <rect x="760" y="535" width="180" height="110" rx="8" fill="#ffffff" stroke="#E91E63" stroke-width="2"/>
  <text x="850" y="565" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#880E4F">
    Monitoring
  </text>
  <text x="850" y="588" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
    • Usage Statistics
  </text>
  <text x="850" y="606" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
    • Analytics Dashboard
  </text>
  <text x="850" y="624" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
    • Performance Metrics
  </text>
  
  <!-- Git -->
  <rect x="980" y="535" width="180" height="110" rx="8" fill="#ffffff" stroke="#E91E63" stroke-width="2"/>
  <text x="1070" y="565" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#880E4F">
    Git / Git-flow
  </text>
  <text x="1070" y="588" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
    • Version Control
  </text>
  <text x="1070" y="606" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
    • Code Review
  </text>
  <text x="1070" y="624" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
    • CI/CD Pipeline
  </text>
  
  <!-- Figma -->
  <rect x="1200" y="535" width="130" height="110" rx="8" fill="#ffffff" stroke="#E91E63" stroke-width="2"/>
  <text x="1265" y="565" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#880E4F">
    Figma
  </text>
  <text x="1265" y="588" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
    • UI/UX Design
  </text>
  <text x="1265" y="606" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
    • Prototyping
  </text>
  <text x="1265" y="624" font-family="Arial" font-size="11" text-anchor="middle" fill="#666">
    • Collaboration
  </text>
  
  <!-- Core Features -->
  <rect x="50" y="710" width="1300" height="160" rx="12" fill="#F5F5F5" stroke="#757575" stroke-width="3"/>
  <text x="700" y="745" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" fill="#424242">
    ⭐ Core Features
  </text>
  
  <!-- Feature boxes -->
  <rect x="100" y="770" width="160" height="75" rx="6" fill="#fff" stroke="#9E9E9E" stroke-width="1.5"/>
  <text x="180" y="795" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">
    Real-time Status
  </text>
  <text x="180" y="815" font-family="Arial" font-size="18" text-anchor="middle">
    🟢 🟡 🔴
  </text>
  <text x="180" y="832" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Classroom Availability
  </text>
  
  <rect x="280" y="770" width="160" height="75" rx="6" fill="#fff" stroke="#9E9E9E" stroke-width="1.5"/>
  <text x="360" y="795" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">
    Professor Office
  </text>
  <text x="360" y="815" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Real-time Status
  </text>
  <text x="360" y="832" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Office Hours Info
  </text>
  
  <rect x="460" y="770" width="160" height="75" rx="6" fill="#fff" stroke="#9E9E9E" stroke-width="1.5"/>
  <text x="540" y="795" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">
    Personal Timetable
  </text>
  <text x="540" y="815" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Next Class Alert
  </text>
  <text x="540" y="832" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Schedule Integration
  </text>
  
  <rect x="640" y="770" width="160" height="75" rx="6" fill="#fff" stroke="#9E9E9E" stroke-width="1.5"/>
  <text x="720" y="795" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">
    Search & Navigation
  </text>
  <text x="720" y="815" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Building/Room Search
  </text>
  <text x="720" y="832" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Campus Map
  </text>
  
  <rect x="820" y="770" width="160" height="75" rx="6" fill="#fff" stroke="#9E9E9E" stroke-width="1.5"/>
  <text x="900" y="795" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">
    Facility Report
  </text>
  <text x="900" y="815" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Issue Reporting
  </text>
  <text x="900" y="832" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Community Feedback
  </text>
  
  <rect x="1000" y="770" width="160" height="75" rx="6" fill="#fff" stroke="#9E9E9E" stroke-width="1.5"/>
  <text x="1080" y="795" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">
    Admin Dashboard
  </text>
  <text x="1080" y="815" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Data Management
  </text>
  <text x="1080" y="832" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Excel Import/Export
  </text>
  
  <rect x="1180" y="770" width="160" height="75" rx="6" fill="#fff" stroke="#9E9E9E" stroke-width="1.5"/>
  <text x="1260" y="795" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle" fill="#333">
    Analytics
  </text>
  <text x="1260" y="815" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Usage Statistics
  </text>
  <text x="1260" y="832" font-family="Arial" font-size="10" text-anchor="middle" fill="#666">
    Data Visualization
  </text>
</svg>
