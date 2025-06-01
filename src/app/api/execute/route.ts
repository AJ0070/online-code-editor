import { NextResponse } from 'next/server';
import { VM } from 'vm2';

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    let output = '';
    
    try {
      // Create a secure VM instance
      const vm = new VM({
        timeout: 5000, // 5 seconds timeout
        sandbox: {
          console: {
            log: (...args: any[]) => {
              output += args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              ).join(' ') + '\n';
            }
          }
        }
      });

      // Execute the code in the sandbox
      vm.run(code);

      return NextResponse.json({ 
        output: output || 'Code executed successfully (no output)',
        language 
      });
    } catch (error: any) {
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