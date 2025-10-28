export interface IResponse<T> {
  status: boolean;
  msg: string;
  items: T;
  pagination: Pagination;
}
export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}
export namespace Slick {
  export interface Config {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    arrows?: boolean;
    asNavFor?: string | string[];
    appendArrows?: string;
    appendDots?: string;
    prevArrow?: string;
    nextArrow?: string;
    centerMode?: boolean;
    centerPadding?: string;
    cssEase?: string;
    customPaging?: (slider: any, i: number) => string;
    dots?: boolean;
    dotsClass?: string;
    draggable?: boolean;
    easing?: string;
    edgeFriction?: number;
    fade?: boolean;
    focusOnSelect?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: 'ondemand' | 'progressive';
    mobileFirst?: boolean;
    pauseOnDotsHover?: boolean;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    respondTo?: 'window' | 'slider' | 'min';
    responsive?: Responsive[];
    rows?: number;
    rtl?: boolean;
    slide?: string;
    slidesPerRow?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    speed?: number;
    swipe?: boolean;
    swipeToSlide?: boolean;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
    verticalSwiping?: boolean;
    waitForAnimate?: boolean;
    zIndex?: number;
  }

  export interface Responsive {
    breakpoint: number;
    settings: Config;
  }
}
