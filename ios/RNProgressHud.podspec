require 'json'
package = JSON.parse(File.read('../package.json'))

Pod::Spec.new do |s|
  s.name         = "RNProgressHud"
  s.version      = package['version']
  s.summary      = "RNProgressHud"
  s.description  = package['description']
  s.homepage     = package['homepage']
  s.license      = "MIT"
  s.author             = { "author" => "bunhouth99@gmail.com" }
  s.platform     = :ios, "9.0"
  s.source       = { :git => "https://github.com/bunhouth/react-native-progress-hud.git", :tag => "master" }
  s.source_files  = "*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  s.dependency "SVProgressHUD"

end
