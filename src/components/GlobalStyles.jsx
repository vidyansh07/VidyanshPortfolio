const GlobalStyles = () => (
    <style jsx global>{`
      @keyframes progress {
        from {
          transform: scaleX(0);
        }
        to {
          transform: scaleX(1);
        }
      }
      
      .animate-progress {
        animation: progress 1s ease-out forwards;
      }
    `}</style>
    )
    export default GlobalStyles;