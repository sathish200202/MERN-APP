const ImageSelector = () => {
  return (
    <div className="p-5">
      <input type="file" accept="image/*" className="hidden" />
      {true ? (
        <button className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50">
          <div className="w-14 h-14 flex items-center justify-center bg-gray-200 rounded-full border border-green-600">
            <Image className="text-xl text-green-600" />
          </div>
          <p className="text-sm text-slate-500">Browse image files to upload</p>
        </button>
      ) : (
        <div className="w-full relative">
          <img
            src=""
            alt="Selected"
            className="w-full h-[300px] object-cover rounded"
          />
          <button className="btn-small btn-delete absolute top-2 right-2">
            <Trash2 className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
