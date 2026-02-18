declare module 'quagga' {
  export interface QuaggaJSStatic {
    init(config: any, callback: (err: Error | null) => void): void;
    start(): void;
    stop(): void;
    onDetected(callback: (result: any) => void): void;
    offDetected(callback?: (result: any) => void): void;
  }

  const Quagga: QuaggaJSStatic;
  export default Quagga;
}
