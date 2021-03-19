<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->json(['status'=>200,'posts'=>Post::orderByDesc('id')->paginate(15)]);
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        if($file = $request->file('image')) {
            $name = time() . $file->getClientOriginalName();
            $file->move(public_path('images'),$name);
        }
      $post = Post::create([
           'user_id'=>1,
           'category_id'=>$request->category,
           'title'=>$request->title,
           'image'=>$name,
           'content'=>$request->content,
           'slug'=>Str::slug($request->title,'-'),
       ]);
       if($post) return response()->json(['status'=>200]);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $post = Post::find($id);
        $category = $post->category;
        return response()->json(['post'=>$post,'category'=>$category,'categories'=>Category::all()]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
      
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $post = Post::find($id);
        $post->delete();
        return response()->json(['status'=>200]);
    }

    public function postUpdate(Request $request,$id) 
    {
        $post = Post::find($id);
        if($file = $request->file('image'))
        {
            $name = time() . $file->getClientOriginalName();
            $file->move(public_path('images'), $name);
            $post->update([
                'user_id'=>1,
                'category_id'=>$request->category,
                'title'=>$request->title,
                'content'=>$request->content,
                'image'=> $name,
                'slug'=>Str::slug($request->title,'-'),
            ]);
        } else {
            $post->update([
                'user_id'=>1,
                'category_id'=>$request->category,
                'title'=>$request->title,
                'content'=>$request->content,
                'slug'=>Str::slug($request->title,'-'),
            ]);
        }
        if($post) return response()->json(['status'=>200]);
    }

    public function multiDeletePosts(Request $request) 
    {
        foreach($request->listOfChecked as $id) 
        {
            $post = Post::find($id);
            $post->delete();
        }

        return response()->json(['status'=>200]);
    }

}
