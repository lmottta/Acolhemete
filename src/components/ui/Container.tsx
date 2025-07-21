import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  as?: 'div' | 'main' | 'section' | 'article' | 'header' | 'footer';
  centerContent?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = 'lg',
      padding = 'md',
      className,
      children,
      as: Component = 'div',
      centerContent = false,
      ...props
    },
    ref
  ) => {
    const baseClasses = ['mx-auto'];

    const sizeClasses = {
      xs: 'max-w-2xl', // ~672px
      sm: 'max-w-4xl', // ~896px
      md: 'max-w-5xl', // ~1024px
      lg: 'max-w-7xl', // ~1280px
      xl: 'max-w-screen-2xl', // ~1536px
      full: 'max-w-none',
    };

    const paddingClasses = {
      none: '',
      sm: 'px-4 sm:px-6',
      md: 'px-4 sm:px-6 lg:px-8',
      lg: 'px-6 sm:px-8 lg:px-12',
    };

    const centerClasses = centerContent
      ? 'flex flex-col items-center justify-center'
      : '';

    const classes = clsx(
      baseClasses,
      sizeClasses[size],
      paddingClasses[padding],
      centerClasses,
      className
    );

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

// Section component that combines Container with semantic HTML and spacing
export interface SectionProps extends ContainerProps {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'neutral' | 'primary' | 'secondary';
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      spacing = 'md',
      background = 'transparent',
      className,
      as = 'section',
      ...props
    },
    ref
  ) => {
    const spacingClasses = {
      none: '',
      sm: 'py-12',
      md: 'py-16',
      lg: 'py-24',
      xl: 'py-32',
    };

    const backgroundClasses = {
      transparent: '',
      neutral: 'bg-neutral-50',
      primary: 'bg-primary-50',
      secondary: 'bg-secondary-50',
    };

    const classes = clsx(
      spacingClasses[spacing],
      backgroundClasses[background],
      className
    );

    return <Container ref={ref} className={classes} as={as} {...props} />;
  }
);

Section.displayName = 'Section';

export default Container;
