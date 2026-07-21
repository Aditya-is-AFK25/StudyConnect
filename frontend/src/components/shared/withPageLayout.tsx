// withPageLayout.tsx — Higher-Order Component (HOC)
// Concept: HOC pattern (taught in MyContainer.tsx in newapp)
// Wraps any page component in a Bootstrap Container with a top user badge

import React from "react";
import { Container, Badge } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";

// HOC function — takes a Component, returns a new enhanced Component
function withPageLayout<P extends object>(WrappedComponent: React.ComponentType<P>) {
  // Returns a new functional component
  const WithLayout = (props: P) => {
    const { user } = useAuth(); // Access auth context from inside HOC

    return (
      <div style={{ minHeight: "100vh" }}>
        {/* Render the actual wrapped page component, passing all its props */}
        <WrappedComponent {...props} />
      </div>
    );
  };

  // Give the HOC a display name for debugging
  WithLayout.displayName = `withPageLayout(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithLayout;
}

export default withPageLayout;
