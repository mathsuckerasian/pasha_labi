import React from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const Counter = () => {
    const { t, i18n } = useTranslation();
    const [count, setCount] = React.useState(0);

    const switchLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div>
            {/* Кнопки в одну строку */}
            <div className="d-flex gap-2 mb-3 flex-wrap">
                <button
                    className={`btn ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => switchLanguage('en')}
                >
                    English
                </button>
                <button
                    className={`btn ${i18n.language === 'ru' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => switchLanguage('ru')}
                >
                    Русский
                </button>
                <button
                    className="btn btn-info"
                    onClick={() => setCount(count + 1)}
                >
                    {t('counter', { count })}
                </button>
                <button
                    className="btn btn-warning"
                    onClick={() => setCount(0)}
                >
                    {t('reset')}
                </button>
            </div>
        </div>
    );
};

export default Counter;
