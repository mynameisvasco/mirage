<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use Hash;

class AuthController extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
            'rank' => 'required',
        ]);
        
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->rank = $request->rank;
        if($request->company_rank)
        {
            $user->company_rank = $request->company_rank;
        }
        else
        {
            $user->company_rank = 3;
        }
        if($request->company_id)
        {
            $user->company_id = $request->company_id;
        }
        if(auth()->user()->company_rank == 3)
        {
            $user->company_id = auth()->user()->company_id;
        }
        if($request->hasFile('picture'))
        {
            $request->picture->storeAs('public/avatars', md5($request->email) . '.' . $request->picture->getClientOriginalExtension());
            $user->picture = md5($request->email) . '.' . $request->picture->getClientOriginalExtension();
        }
        else
        {
            $user->picture = null;
        }
        
        $user->save();
        $user->load('company');
        return response()->json($user, 201);
    }
  
    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);

        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }
  
    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
  
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function user1($id)
    {
        if(auth()->user()->isClient())
        {
            if(auth()->user()->company_rank != 3)
            {
                return response()->json(null, 401); 
            }
        }
        
        $user = User::with('company')->find($id);

        return response()->json($user);
    }

    public function editUser(Request $request, $id)
    {
        if(auth()->user()->isClient() && auth()->user()->id != $id)
        {
            return response()->json(null, 401);
        }

        if(auth()->user()->company_rank != 3 && $request->company_id != auth()->user()->company_id)
        {
            return response()->json(null, 401);
        }

        $request->validate([
            'name' => 'required|string',
            'email' => "unique:users,email,$id,id",
        ]);
        
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        if(isset($request->rank))
        {
            $user->rank = $request->rank;
        }
        if($request->hasFile('picture'))
        {
            $request->picture->storeAs('public/avatars', md5($request->email) . '.' . $request->picture->getClientOriginalExtension());
            $user->picture = md5($request->email) . '.' . $request->picture->getClientOriginalExtension();
        }
        else
        {
            $user->picture = null;
        }

        $user->save();
        $user->load('company');
        return response()->json($user, 200);
    }

    public function deleteUser($id)
    {
        
        $user = User::find($id);
        $user->delete();

        return response()->json("User deleted with success", 200);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|confirmed|min:6',
        ]);

        $user = User::find(auth()->user()->id);
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json("Password updated with success", 200);

    }

    public function users(Request $request, $rank = 0)
    {
        if(auth()->user()->isClient())
        {
            if(auth()->user()->company_rank != 3)
            {
                return response()->json(null, 401);
            }
            else
            {
                $users = User::where('company_id', auth()->user()->company_id)->with('company')->get();
            }
        }
        else
        {
            if($rank == 'staff')
            {
                $users = User::where('rank', '>', 0)->get();
            }
            else
            {
                $users = User::with('company')->where('rank', 0)->get();
            }
        }

        return response()->json($users, 200);
    }
}