import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    let output = '';
    
    try {
      // Create a safe context for basic code execution
      const context = {
        console: {
          log: (...args: any[]) => {
            output += args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ') + '\n';
          }
        }
      };

      // Basic function execution with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Execution timed out')), 5000);
      });

      const executionPromise = new Promise((resolve) => {
        const fn = new Function('console', code);
        resolve(fn(context.console));
      });

      await Promise.race([executionPromise, timeoutPromise]);

      return NextResponse.json({ 
        output: output || 'Code executed successfully (no output)',
        language 
      });
    } catch (error: any) {
      if (error.message === 'Execution timed out') {
        return NextResponse.json({ 
          error: 'Code execution timed out after 5 seconds'
        }, { 
          status: 408 
        });
      }
      return NextResponse.json({ 
        error: 'Error executing code: ' + error.message 
      }, { 
        status: 500 
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Invalid request: ' + error.message },
      { status: 400 }
    );
  }
} 