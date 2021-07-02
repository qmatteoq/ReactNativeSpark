using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.ReactNative.Managed;
using Windows.ApplicationModel.Core;
using Windows.Storage;
using Windows.Storage.Pickers;
using Windows.UI.Core;

namespace ReactNativeFilePicker
{
    [ReactModule("ReactNativeFilePicker")]
    internal sealed class ReactNativeModule
    {
        [ReactMethod("pick")]
        public async Task<string> PickFile(string extensions, double maxSize = 0)
        {
            try
            {
                FileOpenPicker openPicker = new FileOpenPicker();
                openPicker.SuggestedStartLocation = PickerLocationId.PicturesLibrary;

                if (string.IsNullOrEmpty(extensions))
                {
                    openPicker.FileTypeFilter.Add("*");
                }
                else
                {
                    var extensionsList = extensions.Split(",");
                    foreach (var extension in extensionsList)
                    {
                        openPicker.FileTypeFilter.Add(extension);
                    }
                }

                var file = await PickSingleFileAsync(openPicker);

                var properties = await file.GetBasicPropertiesAsync();
                if (maxSize > 0)
                {
                    double sizeInKb = properties.Size / 1024;
                    if (sizeInKb > maxSize)
                    {
                        return string.Empty;
                    }
                }

                string base64Content = string.Empty;

                var fileStream = await file.OpenReadAsync();

                using (StreamReader reader = new StreamReader(fileStream.AsStream()))
                {
                    using (var memstream = new MemoryStream())
                    {
                        reader.BaseStream.CopyTo(memstream);
                        var bytes = memstream.ToArray();
                        base64Content = Convert.ToBase64String(bytes);
                    }
                }

                return base64Content;
            }
            catch (Exception exc)
            {
                return exc.Message;
            }

        }

        private async Task<StorageFile> PickSingleFileAsync(FileOpenPicker picker)
        {
            TaskCompletionSource<StorageFile> tcs = new TaskCompletionSource<StorageFile>();

            await CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal, async () =>
            {
                var file = await picker.PickSingleFileAsync();
                if (file != null)
                {
                    tcs.SetResult(file);
                }
            });

            var result = await tcs.Task;

            return result;
        }


        [ReactMethod("pickMultipleFiles")]
        public async Task<List<string>> PickMultipleFiles(string extensions, double maxSize = 0)
        {
            try
            {
                List<string> filesBase64 = new List<string>();
                
                FileOpenPicker openPicker = new FileOpenPicker();
                openPicker.SuggestedStartLocation = PickerLocationId.DocumentsLibrary;

                if (string.IsNullOrEmpty(extensions))
                {
                    openPicker.FileTypeFilter.Add("*");
                }
                else
                {
                    var extensionsList = extensions.Split(",");
                    foreach (var extension in extensionsList)
                    {
                        openPicker.FileTypeFilter.Add(extension);
                    }
                }


                var files = await openPicker.PickMultipleFilesAsync();

                foreach (var file in files)
                {
                    string base64Content = string.Empty;

                    var fileStream = await file.OpenReadAsync();

                    using (StreamReader reader = new StreamReader(fileStream.AsStream()))
                    {
                        using (var memstream = new MemoryStream())
                        {
                            reader.BaseStream.CopyTo(memstream);
                            var bytes = memstream.ToArray();
                            base64Content = Convert.ToBase64String(bytes);

                            filesBase64.Add(base64Content);
                        }
                    }
                }

                return filesBase64;
            }
            catch (Exception exc)
            {
                throw exc; 
            }
        }
    }
}
