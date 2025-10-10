'use client'

import { useEffect } from 'react'

export default function MobileNavigationFix() {
  useEffect(() => {
    // Force mobile navigation visibility on load
    const forceMobileNav = () => {
      const isMobile = window.innerWidth <= 768
      
      if (isMobile) {
        // Force mobile button to be visible
        const mobileButton = document.getElementById('mobile-menu-button')
        if (mobileButton) {
          mobileButton.style.display = 'block'
          mobileButton.style.opacity = '1'
          mobileButton.style.visibility = 'visible'
        }
        
        // Force desktop elements to hide
        const desktopNav = document.getElementById('desktop-nav')
        const desktopSignin = document.getElementById('desktop-signin')
        const desktopUserMenu = document.getElementById('desktop-user-menu')
        
        if (desktopNav) desktopNav.style.display = 'none'
        if (desktopSignin) desktopSignin.style.display = 'none'
        if (desktopUserMenu) desktopUserMenu.style.display = 'none'
        
        // Add mobile-specific CSS
        const style = document.createElement('style')
        style.innerHTML = `
          @media (max-width: 768px) {
            #mobile-menu-button {
              display: block !important;
              opacity: 1 !important;
              visibility: visible !important;
            }
            #desktop-nav, #desktop-signin, #desktop-user-menu {
              display: none !important;
            }
            .mobile-menu-container {
              display: block !important;
              width: 100% !important;
            }
          }
        `
        document.head.appendChild(style)
      }
    }
    
    // Run on load
    forceMobileNav()
    
    // Run on resize
    window.addEventListener('resize', forceMobileNav)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', forceMobileNav)
    }
  }, [])

  return null
}