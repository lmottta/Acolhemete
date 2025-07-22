import React, { useState } from 'react';
import { Button } from '../ui';
import { useAccessibility } from '../../hooks';

export interface AccessibilityControlsProps {
  className?: string;
}

export default function AccessibilityControls({
  className,
}: AccessibilityControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    preferences,
    toggleReducedMotion,
    toggleHighContrast,
    setFontSize,
    announceToScreenReader,
  } = useAccessibility();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      announceToScreenReader('Controles de acessibilidade abertos');
    }
  };

  const handleReducedMotionToggle = () => {
    toggleReducedMotion();
    announceToScreenReader(
      `Movimento reduzido ${!preferences.reducedMotion ? 'ativado' : 'desativado'}`
    );
  };

  const handleHighContrastToggle = () => {
    toggleHighContrast();
    announceToScreenReader(
      `Alto contraste ${!preferences.highContrast ? 'ativado' : 'desativado'}`
    );
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    const sizeLabels = {
      small: 'pequena',
      medium: 'média',
      large: 'grande',
    };
    announceToScreenReader(
      `Tamanho da fonte alterado para ${sizeLabels[size]}`
    );
  };

  return (
    <div className={`fixed right-4 top-20 z-50 ${className}`}>
      {/* Toggle Button */}
      <Button
        variant="primary"
        size="sm"
        onClick={handleToggle}
        className="rounded-full w-12 h-12 p-0 shadow-medium hover:shadow-large transition-all duration-200"
        aria-label={
          isOpen
            ? 'Fechar controles de acessibilidade'
            : 'Abrir controles de acessibilidade'
        }
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
          />
        </svg>
      </Button>

      {/* Controls Panel */}
      <div
        id="accessibility-panel"
        className={`mt-2 bg-white rounded-xl shadow-large border border-neutral-200 p-4 min-w-[280px] transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 visible transform translate-y-0'
            : 'opacity-0 invisible transform -translate-y-2 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-labelledby="accessibility-title"
      >
        <div className="space-y-4">
          <div>
            <h3
              id="accessibility-title"
              className="text-sm font-semibold text-neutral-900 mb-3"
            >
              Controles de Acessibilidade
            </h3>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="reduced-motion"
              className="text-sm text-neutral-700 font-medium"
            >
              Movimento Reduzido
            </label>
            <button
              id="reduced-motion"
              type="button"
              onClick={handleReducedMotionToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                preferences.reducedMotion ? 'bg-primary-500' : 'bg-neutral-300'
              }`}
              role="switch"
              aria-checked={preferences.reducedMotion}
              aria-describedby="reduced-motion-description"
            >
              <span className="sr-only">
                {preferences.reducedMotion ? 'Desativar' : 'Ativar'} movimento
                reduzido
              </span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p
            id="reduced-motion-description"
            className="text-xs text-neutral-500"
          >
            Reduz animações e transições para usuários sensíveis ao movimento
          </p>

          {/* High Contrast Toggle */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="high-contrast"
              className="text-sm text-neutral-700 font-medium"
            >
              Alto Contraste
            </label>
            <button
              id="high-contrast"
              type="button"
              onClick={handleHighContrastToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                preferences.highContrast ? 'bg-primary-500' : 'bg-neutral-300'
              }`}
              role="switch"
              aria-checked={preferences.highContrast}
              aria-describedby="high-contrast-description"
            >
              <span className="sr-only">
                {preferences.highContrast ? 'Desativar' : 'Ativar'} alto
                contraste
              </span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p
            id="high-contrast-description"
            className="text-xs text-neutral-500"
          >
            Aumenta o contraste para melhor legibilidade
          </p>

          {/* Font Size Controls */}
          <div>
            <label className="text-sm text-neutral-700 font-medium block mb-2">
              Tamanho da Fonte
            </label>
            <div
              className="flex space-x-1"
              role="radiogroup"
              aria-labelledby="font-size-label"
            >
              {(['small', 'medium', 'large'] as const).map(size => {
                const labels = {
                  small: 'P',
                  medium: 'M',
                  large: 'G',
                };
                const fullLabels = {
                  small: 'Pequena',
                  medium: 'Média',
                  large: 'Grande',
                };

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleFontSizeChange(size)}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      preferences.fontSize === size
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                    role="radio"
                    aria-checked={preferences.fontSize === size}
                    aria-label={`Tamanho da fonte ${fullLabels[size]}`}
                  >
                    {labels[size]}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Ajusta o tamanho do texto em toda a página
            </p>
          </div>

          {/* Close Button */}
          <div className="pt-2 border-t border-neutral-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              fullWidth
              className="text-neutral-600 hover:text-neutral-800"
            >
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
